// Run with a disposable Chromium instance on --remote-debugging-port=9222:
// node tests/journal-viewport.mjs [index.html | dist/what-did-i-do.html]
// No dependencies; requires Node 22+.
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const endpoint = process.env.CHROME_DEBUG_URL || "http://127.0.0.1:9222";
const tab = await (await fetch(`${endpoint}/json/new?about:blank`, { method: "PUT" })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});
let id = 0;
const pending = new Map();
ws.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  const callback = pending.get(message.id);
  if (callback) {
    pending.delete(message.id);
    if (message.error) callback.reject(new Error(JSON.stringify(message.error)));
    else callback.resolve(message.result);
  }
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
try {
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: pathToFileURL(resolve(process.argv[2] || "index.html")).href });
  await evaluate(`new Promise(resolve => {
    const check = () => document.getElementById('entry-text') ? resolve() : setTimeout(check, 20);
    check();
  })`);
  const result = await evaluate(`(async () => {
    const ta = document.getElementById('entry-text');
    ta.value = Array.from({length: 100}, (_, i) => 'Journal line ' + i).join('\\n');
    autoGrow(ta);
    const expanded = ta.clientHeight > 2000;
    ta.focus();
    // Simulate a keyboard that changes only the visual viewport (iOS/Android).
    // Supply the keyboard's extra scroll range, which headless Chrome lacks.
    document.body.style.paddingBottom = '524px';
    Object.defineProperty(window.visualViewport, 'height', {configurable: true, value: 320});
    window.visualViewport.dispatchEvent(new Event('resize'));
    const capped = ta.getBoundingClientRect().height <= 192;
    const scrollable = ta.scrollHeight > ta.clientHeight && getComputedStyle(ta).overflowY === 'auto';
    const visible = ta.getBoundingClientRect().bottom <= window.visualViewport.offsetTop + 320;
    ta.scrollTop = 500;
    autoGrow(ta);
    const preserved = ta.scrollTop === 500;
    ta.setSelectionRange(ta.value.length, ta.value.length);
    return {expanded, capped, scrollable, visible, preserved};
  })()`);
  for (const [name, passed] of Object.entries(result)) assert.equal(passed, true, name);
  await send("Input.insertText", { text: "\nStill visible" });
  await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  assert.equal(await evaluate(`(() => {
    const ta = document.getElementById('entry-text');
    return ta.scrollHeight - ta.scrollTop - ta.clientHeight < 30;
  })()`), true, "typing at the end scrolls the caret into view");
  assert.equal(await evaluate(`(async () => {
    const ta = document.getElementById('entry-text');
    delete window.visualViewport.height;
    document.body.style.paddingBottom = '';
    window.visualViewport.dispatchEvent(new Event('resize'));
    const restored = ta.clientHeight > 192;
    ta.blur();
    await new Promise(requestAnimationFrame);
    return restored && ta.clientHeight > 2000;
  })()`), true, "keyboard dismissal and blur restore editor height");
  console.log("PASS: long journal, keyboard viewport, internal scrolling, caret, scroll preservation, blur");
} finally {
  await send("Page.close");
  ws.close();
}
