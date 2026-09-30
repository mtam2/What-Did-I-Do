/*
  What Did I Do?
  Copyright (C) 2026 Maxim Tam

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

// ---------------------------------------------------------------------------
// Art
//
// Every icon, sticker, and mood face is a key. The key names a WebP in
// icons/, stickers/, or images/ (inlined as window.WDD_IMAGES by build.sh)
// and carries an emoji fallback so the app is complete before any art
// exists and still complete if a file is missing.
// ---------------------------------------------------------------------------

const ICONS = {
  inbox: "📥", home: "🏠", work: "💼", study: "📚", shopping: "🛒", health: "💊",
  money: "💰", family: "👨‍👩‍👧", travel: "✈️", chores: "🧹", ideas: "💡", books: "📖",
  fitness: "🏃", food: "🍎", pets: "🐾", garden: "🌱", music: "🎵", art: "🎨",
  phone: "📱", car: "🚗", gift: "🎁", medical: "🩺", birthday: "🎂", coffee: "☕",
  cleaning: "🧽", laundry: "🧺", bills: "🧾", mail: "✉️", meeting: "🗓️", code: "💻",
  game: "🎮", movie: "🎬", sleep: "😴", water: "💧", plant: "🪴", heart: "❤️",
  star: "⭐", flag: "🚩", bell: "🔔", pin: "📌", lock: "🔒", key: "🔑",
  camera: "📷", sun: "☀️", moon: "🌙", cloud: "☁️", umbrella: "☂️", leaf: "🍃",
  trophy: "🏆",
};

const STICKERS = {
  sunny: "☀️", rainy: "🌧️", snowy: "❄️", rainbow: "🌈", windy: "🍃", stormy: "⛈️",
  coffee: "☕", tea: "🍵", pizza: "🍕", cake: "🍰", salad: "🥗", cookie: "🍪",
  run: "🏃", bike: "🚴", yoga: "🧘", swim: "🏊", walk: "🚶", nap: "💤",
  book: "📖", movie: "🎬", music: "🎧", game: "🎮", paint: "🎨", camera: "📷",
  love: "💖", sparkle: "✨", fire: "🔥", party: "🎉", star: "⭐", cry: "😢",
  hug: "🤗", laugh: "😂", think: "🤔", tired: "🥱", sick: "🤧", proud: "💪",
  tape: "🩹", clip: "📎", pin: "📌", note: "🗒️", check: "✅", flower: "🌸",
};

// The picker shows the stickers in these groups, after the mascot's poses.
const STICKER_GROUPS = [
  { name: "weather", keys: ["sunny", "rainy", "snowy", "rainbow", "windy", "stormy"] },
  { name: "food", keys: ["coffee", "tea", "pizza", "cake", "salad", "cookie"] },
  { name: "moving", keys: ["run", "bike", "yoga", "swim", "walk", "nap"] },
  { name: "fun", keys: ["book", "movie", "music", "game", "paint", "camera"] },
  { name: "feelings", keys: ["love", "sparkle", "fire", "party", "star", "cry", "hug", "laugh", "think", "tired", "sick", "proud"] },
  { name: "bits", keys: ["tape", "clip", "pin", "note", "check", "flower"] },
];

const PAPERS = ["plain", "lined", "dotted"];

const MOODS = [
  { key: "awful", emoji: "😞", label: "awful", color: "#c43d2c" },
  { key: "meh", emoji: "😕", label: "meh", color: "#d9903a" },
  { key: "okay", emoji: "😐", label: "okay", color: "#b9a53c" },
  { key: "good", emoji: "🙂", label: "good", color: "#5a9e5e" },
  { key: "great", emoji: "😄", label: "great", color: "#2e7d4f" },
];

// Optional prompts for an empty journal entry. Plain text, fully editable,
// and only ever offered while the entry has no writing.
const STARTERS = {
  reflection: { label: "reflection", text: "What went well:\n\nWhat was hard:\n\nOne thing I learned:\n" },
  gratitude: { label: "gratitude", text: "Three things I'm grateful for today:\n1. \n2. \n3. \n" },
  tomorrow: { label: "tomorrow", text: "Tomorrow I want to:\n\nOne thing to let go of:\n" },
};

// Mascot packs. Each pack has the same five poses in stickers/<pack>-<pose>
// (256px) and images/<pack>-<pose> (512px), plus an accent palette applied
// through body[data-pack] in style.css.
const PACKS = {
  owl: { name: "Owl", emoji: "🦉" },
  duck: { name: "Duck", emoji: "🦆" },
  cat: { name: "Cat", emoji: "🐱" },
};
const POSES = ["waving", "writing", "sleeping", "celebrating", "thinking"];
const POSE_EMOJI = { writing: "✍️", sleeping: "💤", celebrating: "🎉", thinking: "🤔" };

function currentPack() {
  return PACKS[state.settings.pack] ? state.settings.pack : "owl";
}

const LIST_COLORS = ["#7a6bb5", "#d9903a", "#2e7d4f", "#3b7dd8", "#c43d2c", "#c05299", "#2a9d8f", "#6c757d"];

function imageSrc(key) {
  const inlined = window.WDD_IMAGES && window.WDD_IMAGES[key];
  return inlined || `${key}.webp`;
}

// An <img> that swaps itself for the emoji glyph when the file is missing.
function artTag(key, emoji, cls, alt) {
  return `<img class="${cls}" src="${imageSrc(key)}" alt="${esc(alt || "")}" data-emoji="${esc(emoji)}" onerror="artFallback(this)" decoding="async" />`;
}

function artFallback(img) {
  const span = document.createElement("span");
  span.className = img.className + " art-emoji";
  span.textContent = img.dataset.emoji || "";
  span.setAttribute("role", "img");
  if (img.alt) span.setAttribute("aria-label", img.alt);
  img.replaceWith(span);
}

function iconTag(icon, cls) {
  if (ICONS[icon]) return artTag(`icons/${icon}`, ICONS[icon], cls || "icon", "");
  return `<span class="${cls || "icon"} art-emoji" aria-hidden="true">${esc(icon || "")}</span>`;
}

function stickerTag(key, cls) {
  if (STICKERS[key]) return artTag(`stickers/${key}`, STICKERS[key], cls || "sticker", key);
  const m = /^([a-z]+)-([a-z]+)$/.exec(key);
  if (m && PACKS[m[1]] && POSES.includes(m[2])) return artTag(`stickers/${key}`, PACKS[m[1]].emoji, cls || "sticker", key);
  return `<span class="${cls || "sticker"} art-emoji" role="img">${esc(key)}</span>`;
}

function moodTag(idx, cls) {
  const m = MOODS[idx];
  if (!m) return "";
  return artTag(`icons/mood-${m.key}`, m.emoji, cls || "mood-face", m.label);
}

function mascotTag(pose, cls) {
  const pack = currentPack();
  return artTag(`images/${pack}-${pose}`, PACKS[pack].emoji, cls || "mascot", "");
}

// The pack's own poses lead the sticker picker.
function packStickerKeys() {
  return POSES.map((p) => `${currentPack()}-${p}`);
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const STORAGE_KEY = "what_did_i_do";
const INBOX_ID = 1;
const MAX_ITEMS = 20; // checklist items per task; used while loading, so it lives above loadState

function defaultState() {
  return {
    version: 1,
    lists: [{ id: INBOX_ID, name: "Inbox", icon: "inbox", color: LIST_COLORS[0], order: 0 }],
    tasks: [],
    entries: {},
    fired: [],
    reminded: "",
    settings: { theme: "system", journalReminder: "", weekStart: 1, pack: "owl", paper: "plain" },
  };
}

let state = loadState();

function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return sanitizeState({ ...base, ...JSON.parse(raw) }, base);
  } catch (e) {
    console.warn("Failed to load state:", e);
  }
  return base;
}

// A bad import or a hand-edited store must never crash every render.
function sanitizeState(s, base) {
  s.settings = { ...base.settings, ...(s.settings && typeof s.settings === "object" ? s.settings : {}) };
  if (!["system", "light", "dark"].includes(s.settings.theme)) s.settings.theme = "system";
  s.settings.weekStart = s.settings.weekStart === 0 ? 0 : 1;
  if (typeof s.settings.journalReminder !== "string") s.settings.journalReminder = "";
  if (!PACKS[s.settings.pack]) s.settings.pack = "owl";
  if (!PAPERS.includes(s.settings.paper)) s.settings.paper = "plain";
  s.lists = Array.isArray(s.lists) ? s.lists.filter(validList) : [];
  if (!s.lists.some((l) => l.id === INBOX_ID)) s.lists.unshift(base.lists[0]);
  s.tasks = Array.isArray(s.tasks) ? s.tasks.filter(validTask) : [];
  const listIds = new Set(s.lists.map((l) => l.id));
  for (const t of s.tasks) if (!listIds.has(t.listId)) t.listId = INBOX_ID;
  s.entries = s.entries && typeof s.entries === "object" && !Array.isArray(s.entries) ? s.entries : {};
  for (const k of Object.keys(s.entries)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || !validEntry(s.entries[k])) delete s.entries[k];
  }
  s.fired = Array.isArray(s.fired) ? s.fired.filter((f) => typeof f === "string") : [];
  if (typeof s.reminded !== "string") s.reminded = "";
  return s;
}

function validList(l) {
  return !!l && Number.isInteger(l.id) && typeof l.name === "string" && l.name.trim() !== "";
}

function validTask(t) {
  if (!t || !Number.isInteger(t.id) || typeof t.title !== "string") return false;
  if (t.due != null && !/^\d{4}-\d{2}-\d{2}$/.test(t.due)) t.due = null;
  if (t.done != null && typeof t.done !== "number") t.done = null;
  if (typeof t.notes !== "string") t.notes = "";
  if (typeof t.reminder !== "string") t.reminder = "";
  t.items = sanitizeItems(t.items);
  if (typeof t.order !== "number") t.order = t.id;
  if (typeof t.created !== "number") t.created = t.id;
  return true;
}

// A task's checklist: a short flat list of { text, done }.
function sanitizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((it) => it && typeof it === "object" && typeof it.text === "string" && it.text.trim() !== "")
    .slice(0, MAX_ITEMS)
    .map((it) => ({ text: it.text.trim().slice(0, 100), done: !!it.done }));
}

function validEntry(e) {
  // An array would pass the object check but drop every field on save.
  if (!e || typeof e !== "object" || Array.isArray(e)) return false;
  if (typeof e.text !== "string") e.text = "";
  if (!Number.isInteger(e.mood) || e.mood < 0 || e.mood >= MOODS.length) e.mood = null;
  if (!Array.isArray(e.stickers)) e.stickers = [];
  e.stickers = e.stickers.filter((k) => typeof k === "string").slice(0, 12);
  if (typeof e.updated !== "number") e.updated = 0;
  return true;
}

function saveState() {
  let failed = false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save state:", e);
    failed = true;
  }
  // Edits stay on screen either way, so a failed save must be loud: the
  // banner stays up until a save succeeds, and export still works from
  // memory.
  document.getElementById("save-error").hidden = !failed;
  if (failed) {
    textSavedKey = "";
    showEntryStatus();
  }
  return !failed;
}

// Another tab wrote newer state. Adopt it so this tab's next save cannot
// overwrite it with a stale snapshot, but carry over journal text still
// waiting on its debounce, and keep the caret if it's being typed into.
window.addEventListener("storage", (e) => {
  if (e.key !== null && e.key !== STORAGE_KEY) return;
  const pending = textSaveTimer ? { key: textSaveKey, entry: state.entries[textSaveKey] } : null;
  const field = document.activeElement && document.activeElement.id === "entry-text" ? document.activeElement : null;
  const caret = field && [field.selectionStart, field.selectionEnd];
  state = loadState();
  if (pending && pending.entry) {
    const entry = ensureEntry(pending.key);
    entry.text = pending.entry.text;
    entry.updated = pending.entry.updated;
    flushEntryText();
  }
  applyTheme();
  render();
  const again = field && document.getElementById("entry-text");
  if (again) {
    again.focus();
    again.setSelectionRange(caret[0], caret[1]);
  }
});

function newId() {
  let id = Date.now();
  while (state.tasks.some((t) => t.id === id) || state.lists.some((l) => l.id === id)) id++;
  return id;
}

// ---------------------------------------------------------------------------
// Dates. Days are local calendar days, keyed "YYYY-MM-DD".
// ---------------------------------------------------------------------------

function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseDay(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

function shiftDay(ts, days) {
  const d = new Date(ts);
  d.setDate(d.getDate() + days);
  return d.getTime();
}

function shiftDayKey(key, days) {
  return dayKey(shiftDay(parseDay(key), days));
}

function startOfDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function todayKey() {
  return dayKey(Date.now());
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDay(key) {
  const d = new Date(parseDay(key));
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

function formatDayLong(key) {
  const d = new Date(parseDay(key));
  const t = todayKey();
  if (key === t) return "Today";
  if (key === shiftDayKey(t, -1)) return "Yesterday";
  if (key === shiftDayKey(t, 1)) return "Tomorrow";
  const year = d.getFullYear() === new Date().getFullYear() ? "" : ` ${d.getFullYear()}`;
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}${year}`;
}

function formatMonth(ts) {
  const d = new Date(ts);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}${ampm}`;
}

function minutesNow() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function minutesOf(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// ---------------------------------------------------------------------------
// Derived data
// ---------------------------------------------------------------------------

function listById(id) {
  return state.lists.find((l) => l.id === id) || state.lists[0];
}

function sortedLists() {
  return [...state.lists].sort((a, b) => a.order - b.order || a.id - b.id);
}

function byOrder(a, b) {
  return a.order - b.order || a.id - b.id;
}

function tasksDue(key) {
  return state.tasks.filter((t) => t.due === key).sort(byOrder);
}

// Open tasks whose due day is before the given day.
function overdueTasks(key) {
  return state.tasks.filter((t) => t.due && t.due < key && !t.done).sort((a, b) => a.due.localeCompare(b.due) || byOrder(a, b));
}

function unscheduledTasks() {
  return state.tasks.filter((t) => !t.due && !t.done).sort(byOrder);
}

function tasksInList(listId) {
  return state.tasks.filter((t) => t.listId === listId).sort(byOrder);
}

function entryFor(key) {
  return state.entries[key] || null;
}

function entryHasContent(e) {
  return !!e && (e.text.trim() !== "" || e.mood !== null || e.stickers.length > 0);
}

// Tasks completed on a given day, keyed by the day they were ticked off.
function completedByDay() {
  const map = {};
  for (const t of state.tasks) {
    if (!t.done) continue;
    const k = dayKey(t.done);
    map[k] = (map[k] || 0) + 1;
  }
  return map;
}

// A day counts when it has a journal entry or at least one completed task.
function activeDays() {
  const days = new Set(Object.keys(completedByDay()));
  for (const k of Object.keys(state.entries)) if (entryHasContent(state.entries[k])) days.add(k);
  return days;
}

// Consecutive days ending today, or ending yesterday if today isn't done yet.
function currentStreak() {
  const days = activeDays();
  let cursor = startOfDay(Date.now());
  if (!days.has(dayKey(cursor))) cursor = shiftDay(cursor, -1);
  let n = 0;
  while (days.has(dayKey(cursor))) {
    n++;
    cursor = shiftDay(cursor, -1);
  }
  return n;
}

function longestStreak() {
  const keys = [...activeDays()].sort();
  let best = 0;
  let run = 0;
  let prev = null;
  for (const k of keys) {
    run = prev !== null && shiftDayKey(prev, 1) === k ? run + 1 : 1;
    prev = k;
    if (run > best) best = run;
  }
  return best;
}

function storageSize() {
  try {
    return new Blob([localStorage.getItem(STORAGE_KEY) || ""]).size;
  } catch (e) {
    return 0;
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

function addTask(title, due, listId) {
  title = title.trim();
  if (!title) return null;
  const id = newId();
  const siblings = state.tasks.filter((t) => t.due === due);
  const order = siblings.length ? Math.max(...siblings.map((t) => t.order)) + 1 : 0;
  const task = { id, listId: listId || INBOX_ID, title, notes: "", items: [], due: due || null, reminder: "", done: null, created: id, order };
  state.tasks.push(task);
  saveState();
  render();
  return task;
}

function taskById(id) {
  return state.tasks.find((t) => t.id === id);
}

function toggleTask(id) {
  const t = taskById(id);
  if (!t) return;
  if (t.done) t.done = null;
  else {
    // Ticking a task off while looking at a past day logs it on that day, so
    // backfilling yesterday works the same as "Mark yesterday done".
    const viewing = view === "today" ? viewDay : todayKey();
    t.done = viewing === todayKey() ? Date.now() : parseDay(viewing) + 12 * 3600000;
  }
  saveState();
  render();
}

function deleteTask(id) {
  const t = taskById(id);
  if (!t) return;
  if (!confirm(`Delete "${t.title}"?`)) return;
  state.tasks = state.tasks.filter((x) => x.id !== id);
  saveState();
  render();
}

function moveTaskToDay(id, key) {
  const t = taskById(id);
  if (!t) return;
  t.due = key;
  const siblings = state.tasks.filter((x) => x.due === key && x.id !== id);
  t.order = siblings.length ? Math.max(...siblings.map((x) => x.order)) + 1 : 0;
  saveState();
  render();
}

function moveAllOverdueToToday() {
  const today = todayKey();
  for (const t of overdueTasks(today)) t.due = today;
  saveState();
  render();
}

function clearCompletedOlderThan(days) {
  const cutoff = Date.now() - days * 86400000;
  const before = state.tasks.length;
  state.tasks = state.tasks.filter((t) => !(t.done && t.done < cutoff));
  saveState();
  render();
  return before - state.tasks.length;
}

// Reorder within whichever group the row was dragged in (a day or a list).
function reorderTasks(ids) {
  ids.forEach((id, i) => {
    const t = taskById(id);
    if (t) t.order = i;
  });
  saveState();
  render();
}

// Task dialog -----------------------------------------------------------------

const taskDialog = document.getElementById("task-dialog");
const taskForm = document.getElementById("task-form");
let editingTask = null; // id, or null when creating
let editingItems = []; // the checklist being edited, copied back on save

function openTaskDialog(id, presetDue) {
  editingTask = id || null;
  const t = id ? taskById(id) : null;
  document.getElementById("task-dialog-title").textContent = t ? "Edit task" : "New task";
  document.getElementById("task-title").value = t ? t.title : "";
  document.getElementById("task-notes").value = t ? t.notes : "";
  editingItems = t ? t.items.map((it) => ({ ...it })) : [];
  renderChecklist();
  document.getElementById("task-due").value = t ? t.due || "" : presetDue || "";
  document.getElementById("task-reminder").value = t ? t.reminder : "";
  const sel = document.getElementById("task-list");
  sel.innerHTML = sortedLists()
    .map((l) => `<option value="${l.id}"${t && t.listId === l.id ? " selected" : ""}>${esc(l.name)}</option>`)
    .join("");
  document.getElementById("btn-task-delete").hidden = !t;
  taskDialog.showModal();
  document.getElementById("task-title").focus();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title").value.trim();
  if (!title) return;
  const due = document.getElementById("task-due").value || null;
  const reminder = document.getElementById("task-reminder").value || "";
  const listId = Number(document.getElementById("task-list").value) || INBOX_ID;
  const notes = document.getElementById("task-notes").value;
  const items = sanitizeItems(editingItems);
  let t = editingTask ? taskById(editingTask) : null;
  if (!t) t = addTask(title, due, listId);
  if (!t) return;
  if (t.due !== due) {
    const siblings = state.tasks.filter((x) => x.due === due && x.id !== t.id);
    t.order = siblings.length ? Math.max(...siblings.map((x) => x.order)) + 1 : 0;
  }
  Object.assign(t, { title, due, reminder, listId, notes, items });
  if (reminder) maybeRequestNotificationPermission();
  saveState();
  taskDialog.close();
  render();
});

// Checklist rows are rebuilt from editingItems; typing edits the array in
// place so a rebuild (after add or remove) never loses text.
const itemsEl = document.getElementById("task-items");
const btnItemAdd = document.getElementById("btn-task-item-add");

function renderChecklist(focusIndex) {
  itemsEl.innerHTML = editingItems
    .map(
      (it, i) => `<li class="checklist-row">
        <input type="checkbox" class="item-done" data-i="${i}" aria-label="Done"${it.done ? " checked" : ""} />
        <input type="text" class="item-text" data-i="${i}" value="${esc(it.text)}" maxlength="100" placeholder="Item" autocomplete="off" />
        <button type="button" class="item-remove" data-i="${i}" aria-label="Remove item">×</button>
      </li>`,
    )
    .join("");
  btnItemAdd.hidden = editingItems.length >= MAX_ITEMS;
  if (focusIndex != null) {
    const field = itemsEl.querySelector(`.item-text[data-i="${focusIndex}"]`);
    if (field) field.focus();
  }
}

function addChecklistItem(after) {
  if (editingItems.length >= MAX_ITEMS) return;
  const at = after == null ? editingItems.length : after + 1;
  editingItems.splice(at, 0, { text: "", done: false });
  renderChecklist(at);
}

btnItemAdd.addEventListener("click", () => addChecklistItem());
itemsEl.addEventListener("input", (e) => {
  if (e.target.classList.contains("item-text")) editingItems[Number(e.target.dataset.i)].text = e.target.value;
});
// "change", not "input": older Safari fires no input event for a checkbox.
itemsEl.addEventListener("change", (e) => {
  if (e.target.classList.contains("item-done")) editingItems[Number(e.target.dataset.i)].done = e.target.checked;
});
itemsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".item-remove");
  if (!b) return;
  editingItems.splice(Number(b.dataset.i), 1);
  renderChecklist();
});
itemsEl.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || !e.target.classList.contains("item-text")) return;
  e.preventDefault(); // Enter here means "next item", not "save the task"
  addChecklistItem(Number(e.target.dataset.i));
});

document.getElementById("btn-task-cancel").addEventListener("click", () => taskDialog.close());
document.getElementById("btn-task-delete").addEventListener("click", () => {
  if (!editingTask) return;
  const id = editingTask;
  taskDialog.close();
  deleteTask(id);
});

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

const listDialog = document.getElementById("list-dialog");
const listForm = document.getElementById("list-form");
let editingList = null;
let pickedIcon = "home";
let pickedColor = LIST_COLORS[0];

function openListDialog(id) {
  editingList = id || null;
  const l = id ? state.lists.find((x) => x.id === id) : null;
  document.getElementById("list-dialog-title").textContent = l ? "Edit list" : "New list";
  document.getElementById("list-name").value = l ? l.name : "";
  pickedIcon = l ? l.icon : "home";
  pickedColor = l ? l.color : LIST_COLORS[state.lists.length % LIST_COLORS.length];
  document.getElementById("btn-list-delete").hidden = !l || l.id === INBOX_ID;
  renderIconGrid();
  renderColorRow();
  listDialog.showModal();
  document.getElementById("list-name").focus();
}

function renderIconGrid() {
  document.getElementById("list-icons").innerHTML = Object.keys(ICONS)
    .map(
      (k) =>
        `<button type="button" class="icon-choice${k === pickedIcon ? " picked" : ""}" data-icon="${k}" role="radio" aria-checked="${k === pickedIcon}" title="${k}">${iconTag(k, "icon")}</button>`,
    )
    .join("");
}

function renderColorRow() {
  document.getElementById("list-colors").innerHTML =
    LIST_COLORS.map(
      (c) =>
        `<button type="button" class="color-choice${c === pickedColor ? " picked" : ""}" data-color="${c}" role="radio" aria-checked="${c === pickedColor}" style="--c:${c}" title="${c}"></button>`,
    ).join("") +
    `<label class="color-custom" title="Custom color"><input type="color" id="list-color-custom" value="${sanitizeColor(pickedColor)}" /><span>custom</span></label>`;
}

function sanitizeColor(c) {
  return /^#[0-9a-f]{6}$/i.test(c) ? c : LIST_COLORS[0];
}

document.getElementById("list-icons").addEventListener("click", (e) => {
  const b = e.target.closest(".icon-choice");
  if (!b) return;
  pickedIcon = b.dataset.icon;
  renderIconGrid();
});

document.getElementById("list-colors").addEventListener("click", (e) => {
  const b = e.target.closest(".color-choice");
  if (!b) return;
  pickedColor = b.dataset.color;
  renderColorRow();
});
document.getElementById("list-colors").addEventListener("input", (e) => {
  if (e.target.id === "list-color-custom") {
    pickedColor = sanitizeColor(e.target.value);
    document.querySelectorAll(".color-choice").forEach((b) => {
      b.classList.toggle("picked", b.dataset.color === pickedColor);
      b.setAttribute("aria-checked", String(b.dataset.color === pickedColor));
    });
  }
});

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("list-name").value.trim();
  if (!name) return;
  let l = editingList ? state.lists.find((x) => x.id === editingList) : null;
  if (!l) {
    l = { id: newId(), name, icon: pickedIcon, color: pickedColor, order: state.lists.length };
    state.lists.push(l);
    selectedList = l.id;
  } else Object.assign(l, { name, icon: pickedIcon, color: sanitizeColor(pickedColor) });
  saveState();
  listDialog.close();
  render();
});

document.getElementById("btn-list-cancel").addEventListener("click", () => listDialog.close());
document.getElementById("btn-list-delete").addEventListener("click", () => {
  const l = editingList ? state.lists.find((x) => x.id === editingList) : null;
  if (!l || l.id === INBOX_ID) return;
  const n = state.tasks.filter((t) => t.listId === l.id).length;
  if (!confirm(`Delete "${l.name}"?${n ? ` Its ${n} task(s) move to Inbox.` : ""}`)) return;
  for (const t of state.tasks) if (t.listId === l.id) t.listId = INBOX_ID;
  state.lists = state.lists.filter((x) => x.id !== l.id);
  if (selectedList === l.id) selectedList = INBOX_ID;
  saveState();
  listDialog.close();
  render();
});

// ---------------------------------------------------------------------------
// Journal
// ---------------------------------------------------------------------------

function ensureEntry(key) {
  if (!state.entries[key]) state.entries[key] = { mood: null, text: "", stickers: [], updated: 0 };
  return state.entries[key];
}

// Drop an entry that has been emptied out so it stops counting as a day.
function pruneEntry(key) {
  const e = state.entries[key];
  if (e && !entryHasContent(e)) delete state.entries[key];
}

function setMood(key, idx) {
  const e = ensureEntry(key);
  e.mood = e.mood === idx ? null : idx;
  e.updated = Date.now();
  pruneEntry(key);
  saveJournal(key);
  render();
}

let textSaveTimer = null;
let textSaveKey = "";
let textSavedKey = ""; // the day whose journal was last saved; any failed save clears it

// Journal text saves quietly after a pause in typing, so say when it has.
function showEntryStatus() {
  const el = document.getElementById("entry-status");
  if (el) el.textContent = textSavedKey === viewDay ? "Saved in this browser" : "";
}

// Every journal change (text, mood, stickers) saves through here so the
// status reflects the latest attempt.
function saveJournal(key) {
  if (saveState()) textSavedKey = key;
  showEntryStatus();
}

function setEntryText(key, text) {
  textSaveKey = key;
  textSavedKey = "";
  showEntryStatus();
  const e = ensureEntry(key);
  e.text = text;
  e.updated = Date.now();
  clearTimeout(textSaveTimer);
  textSaveTimer = setTimeout(() => {
    textSaveTimer = null;
    pruneEntry(key);
    saveJournal(key);
    renderDaySummary(key);
    updateTitle();
  }, 400);
}

function flushEntryText() {
  if (!textSaveTimer) return;
  clearTimeout(textSaveTimer);
  textSaveTimer = null;
  for (const k of Object.keys(state.entries)) pruneEntry(k);
  saveJournal(textSaveKey);
}
window.addEventListener("pagehide", flushEntryText);
window.addEventListener("beforeunload", flushEntryText);

function toggleSticker(key, sticker) {
  const e = ensureEntry(key);
  const i = e.stickers.indexOf(sticker);
  if (i >= 0) e.stickers.splice(i, 1);
  else if (e.stickers.length < 12) e.stickers.push(sticker);
  e.updated = Date.now();
  pruneEntry(key);
  saveJournal(key);
  render();
}

// ---------------------------------------------------------------------------
// Settings dialog
// ---------------------------------------------------------------------------

const settingsDialog = document.getElementById("settings-dialog");

function openSettings() {
  document.getElementById("set-theme").value = state.settings.theme;
  document.getElementById("set-pack").value = currentPack();
  document.getElementById("set-paper").value = state.settings.paper;
  document.getElementById("set-week-start").value = String(state.settings.weekStart);
  document.getElementById("set-journal-reminder").value = state.settings.journalReminder;
  const n = state.tasks.length;
  const done = state.tasks.filter((t) => t.done).length;
  const entries = Object.keys(state.entries).length;
  document.getElementById("set-storage").textContent =
    `${formatBytes(storageSize())} in this browser's storage: ${n} task(s), ${done} completed, ${entries} journal entr${entries === 1 ? "y" : "ies"}. Browsers allow about 5 MB.`;
  settingsDialog.showModal();
}

document.getElementById("btn-settings").addEventListener("click", openSettings);
document.getElementById("btn-settings-close").addEventListener("click", () => settingsDialog.close());

document.getElementById("set-theme").addEventListener("change", (e) => {
  state.settings.theme = e.target.value;
  saveState();
  applyTheme();
});
document.getElementById("set-pack").addEventListener("change", (e) => {
  state.settings.pack = PACKS[e.target.value] ? e.target.value : "owl";
  saveState();
  applyTheme();
  render();
});
document.getElementById("set-paper").addEventListener("change", (e) => {
  state.settings.paper = PAPERS.includes(e.target.value) ? e.target.value : "plain";
  saveState();
  applyTheme();
});
document.getElementById("set-week-start").addEventListener("change", (e) => {
  state.settings.weekStart = Number(e.target.value) === 0 ? 0 : 1;
  saveState();
  render();
});
document.getElementById("set-journal-reminder").addEventListener("change", (e) => {
  state.settings.journalReminder = e.target.value || "";
  if (state.settings.journalReminder) maybeRequestNotificationPermission();
  saveState();
  updateTitle();
});
document.getElementById("btn-clear-completed").addEventListener("click", () => {
  const cutoff = Date.now() - 90 * 86400000;
  const n = state.tasks.filter((t) => t.done && t.done < cutoff).length;
  if (!n) {
    alert("No completed tasks older than 90 days.");
    return;
  }
  if (!confirm(`Delete ${n} completed task(s) older than 90 days? Days they were completed on stay in your history only through journal entries.`)) return;
  clearCompletedOlderThan(90);
  openSettings();
});
document.getElementById("btn-delete-all").addEventListener("click", () => {
  if (!confirm("Delete every list, task, and journal entry on this browser? Export first if you want a copy.")) return;
  if (!confirm("Really delete everything? This cannot be undone.")) return;
  state = defaultState();
  saveState();
  settingsDialog.close();
  applyTheme();
  viewDay = todayKey();
  selectedList = INBOX_ID;
  showView("today");
});

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

let view = "today";
let viewDay = todayKey(); // the day shown in the today view
let selectedList = INBOX_ID; // the list open in the tasks view
let calMonth = startOfMonth(Date.now()); // first day of the month shown in the calendar
let stickerPickerOpen = false;

function startOfMonth(ts) {
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
}

// Safe in element text and in quoted attribute values.
function esc(s) {
  return (s == null ? "" : String(s))
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showView(name) {
  view = name;
  window.scrollTo(0, 0);
  render();
}

function openDay(key) {
  viewDay = key;
  stickerPickerOpen = false;
  showView("today");
}

let renderedDay = "";

// Every render rebuilds the view, so remember which folded sections the
// user opened rather than snapping them shut after each change.
const openFolds = new Set();
function foldOpen(name) {
  return openFolds.has(name) ? " open" : "";
}

function render() {
  renderedDay = todayKey();
  for (const name of ["today", "tasks", "journal", "calendar", "stats"]) {
    document.getElementById(`view-${name}`).hidden = name !== view;
  }
  if (view === "today") renderToday();
  else if (view === "tasks") renderTasks();
  else if (view === "journal") renderJournal();
  else if (view === "calendar") renderCalendar();
  else if (view === "stats") renderStats();
  updateTitle();
  syncNav();
}

// Today -----------------------------------------------------------------------

function taskRow(t, opts) {
  const l = listById(t.listId);
  const cls = ["task-row", t.done ? "done" : "", opts && opts.overdue ? "overdue" : ""].filter(Boolean).join(" ");
  const meta = [];
  if (opts && opts.showDue && t.due) meta.push(t.due === todayKey() ? "today" : formatDay(t.due));
  if (opts && opts.overdue) meta.push(formatDay(t.due));
  if (t.reminder) meta.push(formatTime(t.reminder));
  if (t.items.length) meta.push(`${t.items.filter((it) => it.done).length}/${t.items.length}`);
  if (t.notes.trim()) meta.push("notes");
  return `<li class="${cls}" data-id="${t.id}" style="--list-color:${sanitizeColor(l.color)}">
    <button class="check" data-action="toggle" data-id="${t.id}" role="checkbox" aria-checked="${!!t.done}" aria-label="${t.done ? "Mark not done" : "Mark done"}"></button>
    <button class="task-main" data-action="edit-task" data-id="${t.id}">
      <span class="task-tile">${iconTag(l.icon, "icon task-icon")}</span>
      <span class="task-body">
        <span class="task-title">${esc(t.title)}</span>
        <span class="task-meta"><span class="meta-chip list-chip">${esc(l.name)}</span>${meta.map((m) => `<span class="meta-chip">${esc(m)}</span>`).join("")}</span>
      </span>
    </button>
    ${opts && opts.move ? `<button class="task-move" data-action="move-today" data-id="${t.id}" title="Move to today">→ today</button>` : ""}
    ${opts && opts.reorder ? `<span class="drag-handle" title="Drag to reorder" aria-hidden="true"></span>` : ""}
  </li>`;
}

function renderToday() {
  const key = viewDay;
  const isToday = key === todayKey();
  const due = tasksDue(key);
  const open = due.filter((t) => !t.done);
  const done = due.filter((t) => t.done);
  const overdue = isToday ? overdueTasks(key) : [];
  const unscheduled = unscheduledTasks();
  const entry = entryFor(key) || { mood: null, text: "", stickers: [] };

  const overdueHtml = overdue.length
    ? `<div class="block overdue-block">
        <div class="block-head"><h2>Overdue</h2><button class="small" data-action="move-all-today">move all to today</button></div>
        <ul class="task-list">${overdue.map((t) => taskRow(t, { overdue: true, move: true })).join("")}</ul>
      </div>`
    : "";

  const emptyTasks = !due.length
    ? `<div class="empty">${mascotTag(isToday ? "waving" : "thinking", "mascot")}<p>${isToday ? "Nothing planned yet. Add a task below." : "Nothing was planned for this day."}</p></div>`
    : "";

  const doneHtml = done.length
    ? `<details class="fold" data-fold="today-completed"${foldOpen("today-completed")}><summary>completed (${done.length})</summary>
        <ul class="task-list">${done.map((t) => taskRow(t)).join("")}</ul>
      </details>`
    : "";

  const unscheduledHtml = unscheduled.length
    ? `<details class="fold" data-fold="today-unscheduled"${foldOpen("today-unscheduled")}><summary>unscheduled (${unscheduled.length})</summary>
        <ul class="task-list">${unscheduled.map((t) => taskRow(t, { showList: true, move: true })).join("")}</ul>
      </details>`
    : "";

  const listOptions = sortedLists()
    .map((l) => `<option value="${l.id}"${l.id === selectedList ? " selected" : ""}>${esc(l.name)}</option>`)
    .join("");

  const stickerRow = entry.stickers.map((k) => `<button class="sticker-chip" data-action="sticker" data-key="${esc(k)}" title="Remove">${stickerTag(k, "sticker")}</button>`).join("");
  const groups = [{ name: PACKS[currentPack()].name.toLowerCase(), keys: packStickerKeys() }, ...STICKER_GROUPS];
  const stickerPicker = stickerPickerOpen
    ? `<div class="sticker-grid">${groups
        .map(
          (g) => `<div class="sticker-group"><span class="sticker-group-name">${esc(g.name)}</span>${g.keys
            .map((k) => `<button class="sticker-choice${entry.stickers.includes(k) ? " picked" : ""}" data-action="sticker" data-key="${k}" title="${k}">${stickerTag(k, "sticker")}</button>`)
            .join("")}</div>`,
        )
        .join("")}</div>`
    : "";

  document.getElementById("view-today").innerHTML = `
    <div class="day-nav">
      <button class="day-arrow" data-action="day" data-delta="-1" aria-label="Previous day">‹</button>
      <div class="day-title">
        <div class="day-name">${esc(formatDayLong(key))}</div>
        <div class="day-sub">${isToday ? esc(formatDay(key)) : `<button class="link" data-action="jump-today">back to today</button>`}</div>
      </div>
      <button class="day-arrow" data-action="day" data-delta="1" aria-label="Next day">›</button>
    </div>

    ${overdueHtml}

    <div class="block">
      <div class="block-head"><h2>Tasks</h2>${due.length ? `<span class="count">${done.length} of ${due.length} done</span>` : ""}</div>
      ${emptyTasks}
      <ul class="task-list">${open.map((t) => taskRow(t)).join("")}</ul>
      <form class="quick-add" id="quick-add">
        <input type="text" id="quick-title" placeholder="Add a task for ${isToday ? "today" : "this day"}…" maxlength="200" autocomplete="off" />
        ${state.lists.length > 1 ? `<select id="quick-list" aria-label="List">${listOptions}</select>` : ""}
        <button type="submit" class="primary" aria-label="Add">+</button>
      </form>
      ${doneHtml}
      ${unscheduledHtml}
    </div>

    <div class="block journal-block">
      <div class="block-head"><h2>Journal</h2></div>
      <div class="mood-row" role="radiogroup" aria-label="Mood">
        ${MOODS.map((m, i) => `<button class="mood-btn${entry.mood === i ? " picked" : ""}" data-action="mood" data-idx="${i}" role="radio" aria-checked="${entry.mood === i}" title="${m.label}" style="--mood:${m.color}">${moodTag(i, "mood-face")}<span class="mood-label">${m.label}</span></button>`).join("")}
      </div>
      <textarea id="entry-text" class="entry-text" placeholder="${isToday ? "How did today go?" : "What happened that day?"}" rows="4">${esc(entry.text)}</textarea>
      ${starterRow(entry)}
      <div class="sticker-row">
        ${stickerRow}
        <button class="sticker-add${stickerPickerOpen ? " open" : ""}" data-action="sticker-picker" aria-expanded="${stickerPickerOpen}" title="Add a sticker">${stickerPickerOpen ? "done" : "+ sticker"}</button>
        <span class="entry-status" id="entry-status" role="status"></span>
      </div>
      ${stickerPicker}
    </div>

    <p class="day-summary" id="day-summary"></p>
  `;
  renderDaySummary(key);
  showEntryStatus();
  autoGrow(document.getElementById("entry-text"));
}

// The starters only show while there is nothing written, so they can never
// replace anything. Typing doesn't re-render, so the row is always in the
// markup and the input handler shows or hides it as the text changes.
function starterRow(entry) {
  const chips = Object.keys(STARTERS)
    .map((k) => `<button class="starter-chip" data-action="starter" data-key="${k}">${esc(STARTERS[k].label)}</button>`)
    .join("");
  return `<div class="starter-row"${entry.text.trim() !== "" ? " hidden" : ""}><span class="starter-label">start with</span>${chips}</div>`;
}

function syncStarterRow(text) {
  const row = document.querySelector("#view-today .starter-row");
  if (row) row.hidden = text.trim() !== "";
}

function insertStarter(key, name) {
  const s = STARTERS[name];
  const e = entryFor(key);
  if (!s || (e && e.text.trim() !== "")) return;
  setEntryText(key, s.text);
  render();
  const ta = document.getElementById("entry-text");
  if (!ta) return;
  ta.focus();
  // Land at the end of the line under the first prompt, ready to write.
  const caret = s.text.indexOf("\n", s.text.indexOf("\n") + 1);
  ta.setSelectionRange(caret, caret);
}

function renderDaySummary(key) {
  const el = document.getElementById("day-summary");
  if (!el || view !== "today" || key !== viewDay) return;
  const due = tasksDue(key);
  const done = due.filter((t) => t.done).length;
  const e = entryFor(key);
  const parts = [];
  if (due.length) parts.push(`${done} of ${due.length} done`);
  if (e && e.mood !== null) parts.push(`mood ${MOODS[e.mood].label}`);
  if (e && e.text.trim()) {
    const words = e.text.trim().split(/\s+/).length;
    parts.push(`${words} word${words === 1 ? "" : "s"}`);
  }
  const streak = currentStreak();
  if (streak) parts.push(`${streak}-day streak`);
  el.textContent = parts.join(" · ");
}

function autoGrow(ta) {
  if (!ta) return;
  ta.style.height = "auto";
  ta.style.height = `${Math.max(ta.scrollHeight, 96)}px`;
}

// Search and filters ----------------------------------------------------------
//
// Filters are view state, never saved. The bars live in index.html rather
// than in the rendered markup so typing into them survives a render.

const taskFilter = { q: "", list: "", status: "", sched: "" };
const journalFilter = { q: "", mood: "", from: "", to: "" };

function filterActive(f) {
  return Object.values(f).some((v) => v !== "");
}

function clearFilter(f) {
  for (const k of Object.keys(f)) f[k] = "";
  syncFilterBars();
}

// Push the filter objects back into the bars (after "clear filters").
function syncFilterBars() {
  document.getElementById("tf-q").value = taskFilter.q;
  document.getElementById("tf-list").value = taskFilter.list;
  document.getElementById("tf-status").value = taskFilter.status;
  document.getElementById("tf-sched").value = taskFilter.sched;
  document.getElementById("jf-q").value = journalFilter.q;
  document.getElementById("jf-mood").value = journalFilter.mood;
  document.getElementById("jf-from").value = journalFilter.from;
  document.getElementById("jf-to").value = journalFilter.to;
}

function textMatches(q, ...fields) {
  const needle = q.trim().toLowerCase();
  return !needle || fields.some((f) => f.toLowerCase().includes(needle));
}

function taskMatches(t, f, today) {
  if (!textMatches(f.q, t.title, t.notes)) return false;
  if (f.list && t.listId !== Number(f.list)) return false;
  if (f.status === "open" && t.done) return false;
  if (f.status === "done" && !t.done) return false;
  if (f.sched === "scheduled" && !t.due) return false;
  if (f.sched === "unscheduled" && t.due) return false;
  if (f.sched === "overdue" && !(t.due && t.due < today && !t.done)) return false;
  return true;
}

function entryMatches(key, e, f) {
  if (!textMatches(f.q, e.text)) return false;
  if (f.mood !== "" && e.mood !== Number(f.mood)) return false;
  if (f.from && key < f.from) return false;
  if (f.to && key > f.to) return false;
  return true;
}

function filterStatus(what, parts) {
  return `<div class="filter-status"><span>${esc([what, ...parts].join(" · "))}</span><button class="link" data-action="clear-filters">clear filters</button></div>`;
}

const bars = { task: document.getElementById("task-filter"), journal: document.getElementById("journal-filter") };

bars.task.addEventListener("input", () => {
  taskFilter.q = document.getElementById("tf-q").value;
  taskFilter.list = document.getElementById("tf-list").value;
  taskFilter.status = document.getElementById("tf-status").value;
  taskFilter.sched = document.getElementById("tf-sched").value;
  renderTasks();
});
bars.journal.addEventListener("input", () => {
  journalFilter.q = document.getElementById("jf-q").value;
  journalFilter.mood = document.getElementById("jf-mood").value;
  journalFilter.from = document.getElementById("jf-from").value;
  journalFilter.to = document.getElementById("jf-to").value;
  renderJournal();
});
for (const bar of Object.values(bars)) bar.addEventListener("submit", (e) => e.preventDefault());

document.getElementById("jf-mood").innerHTML =
  `<option value="">any mood</option>` + MOODS.map((m, i) => `<option value="${i}">${esc(m.label)}</option>`).join("");

// Tasks -----------------------------------------------------------------------

function renderTaskResults() {
  const today = todayKey();
  const found = state.tasks
    .filter((t) => taskMatches(t, taskFilter, today))
    .sort((a, b) => (a.done ? 1 : 0) - (b.done ? 1 : 0) || (a.due || "9").localeCompare(b.due || "9") || byOrder(a, b));
  const parts = [];
  if (taskFilter.q.trim()) parts.push(`“${taskFilter.q.trim()}”`);
  if (taskFilter.list) parts.push(listById(Number(taskFilter.list)).name);
  if (taskFilter.status) parts.push(taskFilter.status);
  if (taskFilter.sched) parts.push(taskFilter.sched);
  document.getElementById("tasks-body").innerHTML = `
    ${filterStatus(`${found.length} of ${state.tasks.length} task${state.tasks.length === 1 ? "" : "s"}`, parts)}
    <div class="block">
      ${found.length ? `<ul class="task-list">${found.map((t) => taskRow(t, { showDue: true })).join("")}</ul>` : `<p class="hint">No tasks match.</p>`}
    </div>
  `;
}

function renderTasks() {
  if (!state.lists.some((l) => l.id === selectedList)) selectedList = INBOX_ID;
  const lists = sortedLists();
  bars.task.hidden = !state.tasks.length;
  const listSel = document.getElementById("tf-list");
  listSel.innerHTML = `<option value="">all lists</option>` + lists.map((l) => `<option value="${l.id}">${esc(l.name)}</option>`).join("");
  listSel.value = lists.some((l) => String(l.id) === taskFilter.list) ? taskFilter.list : "";
  taskFilter.list = listSel.value;
  if (state.tasks.length && filterActive(taskFilter)) {
    renderTaskResults();
    return;
  }
  const chips = lists
    .map((l) => {
      const open = state.tasks.filter((t) => t.listId === l.id && !t.done).length;
      return `<button class="avatar${l.id === selectedList ? " active" : ""}" data-action="select-list" data-id="${l.id}" style="--list-color:${sanitizeColor(l.color)}" title="${esc(l.name)}"><span class="avatar-ring">${iconTag(l.icon, "icon avatar-icon")}${open ? `<span class="avatar-count">${open}</span>` : ""}</span><span class="avatar-name">${esc(l.name)}</span></button>`;
    })
    .join("");
  const l = listById(selectedList);
  const tasks = tasksInList(l.id);
  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done).sort((a, b) => b.done - a.done);

  document.getElementById("tasks-body").innerHTML = `
    <div class="avatars">${chips}<button class="avatar avatar-new" data-action="new-list" title="New list"><span class="avatar-ring">+</span><span class="avatar-name">new list</span></button></div>
    <div class="block" style="--list-color:${sanitizeColor(l.color)}">
      <div class="block-head list-head">
        <h2>${iconTag(l.icon, "icon")} ${esc(l.name)}</h2>
        <button class="small" data-action="edit-list" data-id="${l.id}">${l.id === INBOX_ID ? "rename" : "edit"}</button>
      </div>
      ${open.length ? "" : `<div class="empty">${mascotTag(done.length ? "celebrating" : "waving", "mascot")}<p>${done.length ? "All done here." : "Nothing in this list yet."}</p></div>`}
      <ul class="task-list reorderable">${open.map((t) => taskRow(t, { showDue: true, reorder: true })).join("")}</ul>
      <form class="quick-add" id="quick-add">
        <input type="text" id="quick-title" placeholder="Add a task to ${esc(l.name)}…" maxlength="200" autocomplete="off" />
        <input type="date" id="quick-due" aria-label="Due date" />
        <button type="submit" class="primary" aria-label="Add">+</button>
      </form>
      ${done.length ? `<details class="fold" data-fold="tasks-completed"${foldOpen("tasks-completed")}><summary>completed (${done.length})</summary><ul class="task-list">${done.map((t) => taskRow(t, { showDue: true })).join("")}</ul></details>` : ""}
    </div>
    <p class="hint">Drag a task to reorder it (press and hold on touch). Tap a task to edit it or set a reminder.</p>
  `;
}

// Journal ---------------------------------------------------------------------

function renderJournal() {
  const body = document.getElementById("journal-body");
  const all = Object.keys(state.entries)
    .filter((k) => entryHasContent(state.entries[k]))
    .sort()
    .reverse();
  bars.journal.hidden = !all.length;
  if (!all.length) {
    body.innerHTML = `<div class="empty tall">${mascotTag("writing", "mascot")}<p>No entries yet. Pick a mood or write a line on the today tab and it shows up here.</p><button class="primary" data-action="jump-today">write today's entry</button></div>`;
    return;
  }
  const filtering = filterActive(journalFilter);
  const keys = filtering ? all.filter((k) => entryMatches(k, state.entries[k], journalFilter)) : all;
  let lastMonth = "";
  const items = [];
  if (filtering) {
    const f = journalFilter;
    const parts = [];
    if (f.q.trim()) parts.push(`“${f.q.trim()}”`);
    if (f.mood !== "") parts.push(`mood ${MOODS[Number(f.mood)].label}`);
    if (f.from && f.to) parts.push(`${formatDay(f.from)} to ${formatDay(f.to)}`);
    else if (f.from) parts.push(`from ${formatDay(f.from)}`);
    else if (f.to) parts.push(`to ${formatDay(f.to)}`);
    items.push(filterStatus(`${keys.length} of ${all.length} entr${all.length === 1 ? "y" : "ies"}`, parts));
    if (!keys.length) items.push(`<p class="hint">No entries match.</p>`);
  }
  for (const k of keys) {
    const e = state.entries[k];
    const month = formatMonth(parseDay(k));
    if (month !== lastMonth) {
      items.push(`<h2 class="journal-month">${esc(month)}</h2>`);
      lastMonth = month;
    }
    const text = e.text.trim();
    const snippet = text.length > 220 ? text.slice(0, 220).trimEnd() + "…" : text;
    const dueCount = tasksDue(k).length;
    const doneCount = tasksDue(k).filter((t) => t.done).length;
    items.push(`<button class="journal-entry" data-action="open-day" data-key="${k}" style="--mood:${e.mood !== null ? MOODS[e.mood].color : "var(--border)"}">
      <div class="journal-head">
        <span class="mood-dot" aria-hidden="true"></span>
        <span class="journal-date">${esc(formatDayLong(k))}</span>
        ${e.mood !== null ? `<span class="journal-mood">${esc(MOODS[e.mood].label)}</span>` : ""}
        ${dueCount ? `<span class="journal-tasks">${doneCount}/${dueCount} tasks</span>` : ""}
      </div>
      ${snippet ? `<p class="journal-text">${esc(snippet)}</p>` : ""}
      ${e.stickers.length ? `<div class="journal-stickers">${e.stickers.map((s) => stickerTag(s, "sticker small")).join("")}</div>` : ""}
    </button>`);
  }
  body.innerHTML = `<div class="journal-list">${items.join("")}</div>`;
}

// Calendar --------------------------------------------------------------------

function renderCalendar() {
  const first = new Date(calMonth);
  const year = first.getFullYear();
  const month = first.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekStart = state.settings.weekStart;
  const lead = (first.getDay() - weekStart + 7) % 7;
  const today = todayKey();
  const doneMap = completedByDay();
  const dueMap = {};
  for (const t of state.tasks) if (t.due) dueMap[t.due] = (dueMap[t.due] || 0) + 1;
  const dueDoneMap = {};
  for (const t of state.tasks) if (t.due && t.done) dueDoneMap[t.due] = (dueDoneMap[t.due] || 0) + 1;

  const heads = [];
  for (let i = 0; i < 7; i++) heads.push(`<div class="cal-head">${DAY_NAMES[(weekStart + i) % 7]}</div>`);
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(`<div class="cal-cell pad"></div>`);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const e = state.entries[key];
    const hasText = !!e && e.text.trim() !== "";
    const mood = e && e.mood !== null ? MOODS[e.mood] : null;
    const due = dueMap[key] || 0;
    const dueDone = dueDoneMap[key] || 0;
    const completed = doneMap[key] || 0;
    const future = key > today;
    const sticker = e && e.stickers.length ? e.stickers[0] : "";
    const cls = ["cal-cell", key === today ? "today" : "", future ? "future" : "", (e && entryHasContent(e)) || completed ? "active" : ""].filter(Boolean).join(" ");
    const title = [formatDay(key), mood ? `mood ${mood.label}` : "", due ? `${dueDone}/${due} tasks` : "", hasText ? "journal" : ""].filter(Boolean).join(" · ");
    const bar = due ? `<span class="cal-bar" aria-hidden="true"><span style="width:${Math.round((dueDone / due) * 100)}%"></span></span>` : "";
    // The day's face, else its first sticker, else a dot for writing alone.
    const mark = mood
      ? moodTag(e.mood, "mood-face cal-face")
      : sticker
        ? stickerTag(sticker, "sticker cal-sticker")
        : hasText
          ? `<span class="entry-dot" aria-hidden="true"></span>`
          : "";
    cells.push(`<button class="${cls}" data-action="open-day" data-key="${key}" title="${esc(title)}" style="--mood:${mood ? mood.color : "transparent"}">
      <span class="cal-num">${d}</span>
      <span class="cal-marks">${mark}</span>
      ${bar}
    </button>`);
  }
  const isThisMonth = calMonth === startOfMonth(Date.now());
  document.getElementById("view-calendar").innerHTML = `
    <div class="day-nav">
      <button class="day-arrow" data-action="month" data-delta="-1" aria-label="Previous month">‹</button>
      <div class="day-title">
        <div class="day-name">${esc(formatMonth(calMonth))}</div>
        <div class="day-sub">${isThisMonth ? "this month" : `<button class="link" data-action="month-today">back to this month</button>`}</div>
      </div>
      <button class="day-arrow" data-action="month" data-delta="1" aria-label="Next month">›</button>
    </div>
    <div class="calendar">${heads.join("")}${cells.join("")}</div>
    <div class="legend">
      <span>${moodTag(3, "mood-face cal-face")} mood</span>
      <span>${stickerTag("star", "sticker cal-sticker")} sticker</span>
      <span><span class="entry-dot legend-dot"></span> journal text</span>
      <span><span class="cal-bar legend-bar"><span style="width:60%"></span></span> tasks done</span>
    </div>
  `;
}

// Stats -----------------------------------------------------------------------

const WEEKS = 12;

function renderHeatmap() {
  const doneMap = completedByDay();
  const today = startOfDay(Date.now());
  const todayStr = dayKey(today);
  const weekStart = state.settings.weekStart;
  const dow = (new Date(today).getDay() - weekStart + 7) % 7;
  const gridStart = shiftDay(today, -dow - (WEEKS - 1) * 7);
  const cells = [];
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const ts = shiftDay(gridStart, w * 7 + d);
      const key = dayKey(ts);
      const future = ts > today;
      const n = doneMap[key] || 0;
      const e = state.entries[key];
      const journal = !!e && entryHasContent(e);
      const cls = ["cell"];
      if (future) cls.push("future");
      else if (n >= 5) cls.push("l3");
      else if (n >= 3) cls.push("l2");
      else if (n >= 1) cls.push("l1");
      else if (journal) cls.push("j");
      if (key === todayStr) cls.push("today");
      const title = future ? "" : `${formatDay(key)} · ${n} task${n === 1 ? "" : "s"} done${journal ? " · journal" : ""}`;
      cells.push(`<div class="${cls.join(" ")}" title="${esc(title)}" style="grid-column:${w + 1};grid-row:${d + 1}"></div>`);
    }
  }
  const labels = [];
  for (let i = 0; i < 7; i++) labels.push(`<span>${i % 2 === 0 ? DAY_NAMES[(weekStart + i) % 7][0] : ""}</span>`);
  return `<div class="heatmap-wrap"><div class="heatmap-days">${labels.join("")}</div><div class="heatmap">${cells.join("")}</div></div>`;
}

function renderStats() {
  const cur = currentStreak();
  const best = longestStreak();
  const now = new Date();
  const monthStart = dayKey(startOfMonth(now.getTime()));
  const nextMonthStart = dayKey(new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime());
  const inMonth = (k) => k >= monthStart && k < nextMonthStart;
  const doneMap = completedByDay();
  let doneThisMonth = 0;
  for (const k of Object.keys(doneMap)) if (inMonth(k)) doneThisMonth += doneMap[k];
  const entriesThisMonth = Object.keys(state.entries).filter((k) => inMonth(k) && entryHasContent(state.entries[k])).length;
  const totalDone = state.tasks.filter((t) => t.done).length;
  const totalEntries = Object.keys(state.entries).filter((k) => entryHasContent(state.entries[k])).length;
  const moodCounts = MOODS.map(() => 0);
  for (const k of Object.keys(state.entries)) {
    const e = state.entries[k];
    if (inMonth(k) && e.mood !== null) moodCounts[e.mood]++;
  }
  const moodTotal = moodCounts.reduce((a, b) => a + b, 0);

  document.getElementById("view-stats").innerHTML = `
    <div class="stat-tiles">
      <div class="tile"><div class="tile-num">${cur}</div><div class="tile-label">day streak</div></div>
      <div class="tile"><div class="tile-num">${best}</div><div class="tile-label">longest streak</div></div>
      <div class="tile"><div class="tile-num">${doneThisMonth}</div><div class="tile-label">tasks done this month</div></div>
      <div class="tile"><div class="tile-num">${entriesThisMonth}</div><div class="tile-label">entries this month</div></div>
    </div>
    <div class="block">
      <div class="block-head"><h2>Last twelve weeks</h2></div>
      ${renderHeatmap()}
      <div class="stats-row"><span>shade = tasks done that day</span><span>outline = journal only</span></div>
    </div>
    <div class="block">
      <div class="block-head"><h2>Mood this month</h2></div>
      ${moodTotal ? `<div class="mood-bars">${MOODS.map((m, i) => `<div class="mood-bar-row"><span class="mood-bar-label">${esc(m.label)}</span><span class="mood-bar"><span style="width:${Math.round((moodCounts[i] / moodTotal) * 100)}%;background:${m.color}"></span></span><span class="mood-bar-n">${moodCounts[i]}</span></div>`).join("")}</div>` : `<p class="hint">No moods recorded this month yet.</p>`}
    </div>
    <p class="hint">All time: ${totalDone} task${totalDone === 1 ? "" : "s"} done, ${totalEntries} journal entr${totalEntries === 1 ? "y" : "ies"}. A day counts toward the streak when it has an entry or a completed task.</p>
  `;
}

// ---------------------------------------------------------------------------
// Event delegation for everything rendered above
// ---------------------------------------------------------------------------

const mainEl = document.querySelector("main");

// "toggle" doesn't bubble, hence the capture listener.
mainEl.addEventListener(
  "toggle",
  (e) => {
    const name = e.target.dataset && e.target.dataset.fold;
    if (!name) return;
    if (e.target.open) openFolds.add(name);
    else openFolds.delete(name);
  },
  true,
);

mainEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || !mainEl.contains(btn)) return;
  const a = btn.dataset.action;
  const id = Number(btn.dataset.id);
  if (a === "toggle") toggleTask(id);
  else if (a === "edit-task") openTaskDialog(id);
  else if (a === "move-today") moveTaskToDay(id, todayKey());
  else if (a === "move-all-today") moveAllOverdueToToday();
  else if (a === "day") {
    viewDay = shiftDayKey(viewDay, Number(btn.dataset.delta));
    stickerPickerOpen = false;
    render();
  } else if (a === "jump-today") openDay(todayKey());
  else if (a === "open-day") openDay(btn.dataset.key);
  else if (a === "mood") setMood(viewDay, Number(btn.dataset.idx));
  else if (a === "sticker") toggleSticker(viewDay, btn.dataset.key);
  else if (a === "starter") insertStarter(viewDay, btn.dataset.key);
  else if (a === "clear-filters") {
    clearFilter(view === "tasks" ? taskFilter : journalFilter);
    render();
  }
  else if (a === "sticker-picker") {
    stickerPickerOpen = !stickerPickerOpen;
    render();
  } else if (a === "select-list") {
    selectedList = id;
    render();
  } else if (a === "new-list") openListDialog(null);
  else if (a === "edit-list") openListDialog(id);
  else if (a === "month") {
    const d = new Date(calMonth);
    calMonth = new Date(d.getFullYear(), d.getMonth() + Number(btn.dataset.delta), 1).getTime();
    render();
  } else if (a === "month-today") {
    calMonth = startOfMonth(Date.now());
    render();
  }
});

mainEl.addEventListener("submit", (e) => {
  if (e.target.id !== "quick-add") return;
  e.preventDefault();
  // Every view keeps its last render in the DOM (just hidden), so ids like
  // quick-title exist once per view. Look inside the submitted form.
  const form = e.target;
  const input = form.querySelector("#quick-title");
  const title = input.value.trim();
  if (!title) {
    input.focus();
    return;
  }
  if (view === "today") {
    const picker = form.querySelector("#quick-list"); // absent while Inbox is the only list
    const listId = (picker && Number(picker.value)) || INBOX_ID;
    selectedList = listId;
    addTask(title, viewDay, listId);
  } else {
    const due = form.querySelector("#quick-due").value || null;
    addTask(title, due, selectedList);
  }
  const again = document.querySelector(`#view-${view} #quick-title`);
  if (again) again.focus();
});

mainEl.addEventListener("input", (e) => {
  if (e.target.id === "entry-text") {
    setEntryText(viewDay, e.target.value);
    autoGrow(e.target);
    syncStarterRow(e.target.value);
  }
});

document.addEventListener("keydown", (e) => {
  if (view !== "today" || e.altKey || e.ctrlKey || e.metaKey) return;
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
  if (document.querySelector("dialog[open]")) return;
  if (e.key === "ArrowLeft") {
    viewDay = shiftDayKey(viewDay, -1);
    render();
  } else if (e.key === "ArrowRight") {
    viewDay = shiftDayKey(viewDay, 1);
    render();
  }
});

// Drag-to-reorder via Pointer Events. Mouse drags from anywhere on the row.
// Touch drags only from the handle: the rest of the row must keep vertical
// scrolling, and a browser that has claimed a touch for scrolling cancels
// the pointer, so the handle opts out of panning with touch-action: none.
let drag = null;
const DRAG_THRESHOLD = 5;

mainEl.addEventListener("pointerdown", (e) => {
  const row = e.target.closest(".reorderable > .task-row");
  if (!row) return;
  if (e.target.closest(".check")) return;
  if (e.pointerType === "mouse" ? e.button !== 0 : !e.target.closest(".drag-handle")) return;
  drag = {
    id: Number(row.dataset.id),
    row,
    list: row.parentElement,
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    started: false,
  };
  document.addEventListener("pointermove", onDocPointerMove);
  document.addEventListener("pointerup", onDocPointerUp);
  document.addEventListener("pointercancel", onDocPointerUp);
});

function startDrag() {
  drag.started = true;
  drag.row.classList.add("dragging");
  try {
    drag.row.setPointerCapture(drag.pointerId);
  } catch (_) {}
}

function onDocPointerMove(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const dx = e.clientX - drag.startX;
  const dy = e.clientY - drag.startY;
  if (!drag.started) {
    if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    startDrag();
  }
  e.preventDefault();
  drag.row.style.transform = `translateY(${dy}px)`;
  drag.row.style.pointerEvents = "none";
  const el = document.elementFromPoint(e.clientX, e.clientY);
  drag.row.style.pointerEvents = "";
  drag.list.querySelectorAll(".drag-over").forEach((r) => r.classList.remove("drag-over"));
  const target = el && el.closest(".task-row");
  if (target && target !== drag.row && target.parentElement === drag.list) target.classList.add("drag-over");
}

function onDocPointerUp(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const wasDrag = drag.started;
  if (wasDrag) {
    const target = e.type === "pointercancel" ? null : drag.list.querySelector(".drag-over");
    drag.row.style.transform = "";
    drag.row.classList.remove("dragging");
    drag.list.querySelectorAll(".drag-over").forEach((r) => r.classList.remove("drag-over"));
    if (target) {
      const ids = [...drag.list.querySelectorAll(".task-row")].map((r) => Number(r.dataset.id));
      const from = ids.indexOf(drag.id);
      const to = ids.indexOf(Number(target.dataset.id));
      if (from !== -1 && to !== -1) {
        ids.splice(to, 0, ids.splice(from, 1)[0]);
        cleanupDrag();
        reorderTasks(ids);
        return;
      }
    }
  }
  cleanupDrag();
  // A drag that actually moved must not also count as a tap on the row.
  if (wasDrag) suppressNextClick();
}

function cleanupDrag() {
  document.removeEventListener("pointermove", onDocPointerMove);
  document.removeEventListener("pointerup", onDocPointerUp);
  document.removeEventListener("pointercancel", onDocPointerUp);
  drag = null;
}

function suppressNextClick() {
  const stop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  mainEl.addEventListener("click", stop, { capture: true, once: true });
  setTimeout(() => mainEl.removeEventListener("click", stop, { capture: true }), 300);
}

// ---------------------------------------------------------------------------
// Header navigation
// ---------------------------------------------------------------------------

document.getElementById("link-home").addEventListener("click", (e) => {
  e.preventDefault();
  openDay(todayKey());
});
for (const name of ["today", "tasks", "journal", "calendar", "stats"]) {
  document.getElementById(`btn-view-${name}`).addEventListener("click", () => {
    if (name === "today" && view === "today") viewDay = todayKey();
    showView(name);
  });
}

// The utility buttons live behind the "more" toggle.
const btnMore = document.getElementById("btn-more");
const headerEl = document.querySelector(".header");
function setToolsOpen(open) {
  headerEl.classList.toggle("tools-open", open);
  btnMore.setAttribute("aria-expanded", String(open));
}
btnMore.addEventListener("click", () => setToolsOpen(!headerEl.classList.contains("tools-open")));
document.getElementById("header-tools").addEventListener("click", (e) => {
  if (e.target.closest("button")) setToolsOpen(false);
});
document.addEventListener("click", (e) => {
  if (headerEl.classList.contains("tools-open") && !e.target.closest(".btn-more, .header-tools")) setToolsOpen(false);
});

const NAV_ICONS = { today: "sun", tasks: "inbox", journal: "books", calendar: "meeting", stats: "trophy" };
for (const [name, icon] of Object.entries(NAV_ICONS)) {
  const b = document.getElementById(`btn-view-${name}`);
  b.innerHTML = `${iconTag(icon, "icon nav-icon")}<span class="nav-label">${name}</span>`;
}

function syncNav() {
  for (const name of ["today", "tasks", "journal", "calendar", "stats"]) {
    const b = document.getElementById(`btn-view-${name}`);
    b.classList.toggle("active", name === view);
    if (name === view) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  }
}

// ---------------------------------------------------------------------------
// Reminders and title
//
// Twice a minute: any task due today with a reminder time that has passed
// fires once per task per day; the journal reminder fires once a day when
// today has no entry. The tab title carries a "(!)" while anything is
// pending so a glance at the tab bar answers the question.
// ---------------------------------------------------------------------------

const BASE_TITLE = "What Did I Do?";

function maybeRequestNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") Notification.requestPermission().catch(() => {});
}

function pendingTaskReminders() {
  const today = todayKey();
  const now = minutesNow();
  return state.tasks.filter((t) => t.due === today && t.reminder && !t.done && minutesOf(t.reminder) <= now);
}

function journalReminderDue() {
  const t = state.settings.journalReminder;
  if (!t) return false;
  if (entryHasContent(entryFor(todayKey()))) return false;
  return minutesOf(t) <= minutesNow();
}

function updateTitle() {
  const n = pendingTaskReminders().length + (journalReminderDue() ? 1 : 0);
  document.title = n ? `(!) ${BASE_TITLE}` : BASE_TITLE;
}

function refreshIfDayChanged() {
  if (renderedDay && todayKey() !== renderedDay) render();
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") refreshIfDayChanged();
});
window.addEventListener("focus", refreshIfDayChanged);

function notify(body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try {
    new Notification(BASE_TITLE, { body });
  } catch (e) {
    /* ignore */
  }
}

function checkReminders() {
  refreshIfDayChanged();
  updateTitle();
  const today = todayKey();
  let changed = false;
  for (const t of pendingTaskReminders()) {
    const key = `${t.id}:${today}`;
    if (state.fired.includes(key)) continue;
    state.fired.push(key);
    changed = true;
    notify(t.title);
  }
  if (journalReminderDue() && state.reminded !== today) {
    state.reminded = today;
    changed = true;
    notify("What did you do today? A line is enough.");
  }
  // Keep the dedupe list to the last week.
  const cutoff = shiftDayKey(today, -7);
  const pruned = state.fired.filter((k) => k.split(":")[1] >= cutoff);
  if (pruned.length !== state.fired.length) {
    state.fired = pruned;
    changed = true;
  }
  if (changed) saveState();
}

setInterval(checkReminders, 30000);

// ---------------------------------------------------------------------------
// Export / import
// The whole state travels as one line of text: UTF-8 JSON, deflated when the
// browser offers it, then base64'd so it survives any text box it is pasted
// through. The prefix says which of the two it is.
// ---------------------------------------------------------------------------

const EXPORT_PREFIX = "WDD1:";
const EXPORT_PREFIX_PACKED = "WDD1Z:";

function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x2000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x2000));
  return btoa(bin);
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function pipeBytes(bytes, transform) {
  const stream = new Blob([bytes]).stream().pipeThrough(transform);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function serializeState() {
  flushEntryText();
  const { fired, reminded, ...rest } = state; // reminder bookkeeping stays on this machine
  const json = new TextEncoder().encode(JSON.stringify(rest));
  if (typeof CompressionStream === "function") {
    try {
      const packed = await pipeBytes(json, new CompressionStream("deflate"));
      return EXPORT_PREFIX_PACKED + bytesToBase64(packed);
    } catch (e) {
      console.warn("Could not compress export:", e);
    }
  }
  return EXPORT_PREFIX + bytesToBase64(json);
}

async function deserializeString(text) {
  const s = text.replace(/\s+/g, "");
  if (s.startsWith("{")) return JSON.parse(text);
  let json;
  if (s.startsWith(EXPORT_PREFIX_PACKED)) {
    const packed = base64ToBytes(s.slice(EXPORT_PREFIX_PACKED.length));
    json = await pipeBytes(packed, new DecompressionStream("deflate"));
  } else if (s.startsWith(EXPORT_PREFIX)) {
    json = base64ToBytes(s.slice(EXPORT_PREFIX.length));
  } else {
    throw new Error("Unrecognized export string");
  }
  return JSON.parse(new TextDecoder().decode(json));
}

// Lists and tasks merge by id (yours win), entries by day (newer wins).
async function importString(text) {
  let data;
  try {
    data = await deserializeString(text);
  } catch (err) {
    alert("That doesn't look like a What Did I Do? export string. Copy the whole thing, starting at WDD1.");
    return false;
  }
  if (!data || typeof data !== "object" || (!Array.isArray(data.tasks) && !data.entries)) {
    alert("That string is missing the expected lists/tasks/entries structure.");
    return false;
  }
  const incoming = sanitizeState({ ...defaultState(), ...data }, defaultState());
  const entryKeys = Object.keys(incoming.entries);
  const msg = `Merge ${incoming.lists.length} list(s), ${incoming.tasks.length} task(s), and ${entryKeys.length} journal entr${entryKeys.length === 1 ? "y" : "ies"} into what you have? Items you already have are kept; for a day you both wrote on, the newer entry wins.`;
  if (!confirm(msg)) return false;

  let added = 0;
  let skipped = 0;
  const listIds = new Set(state.lists.map((l) => l.id));
  for (const l of incoming.lists) {
    if (listIds.has(l.id)) {
      skipped++;
      continue;
    }
    listIds.add(l.id);
    state.lists.push({ ...l, order: state.lists.length });
    added++;
  }
  const taskIds = new Set(state.tasks.map((t) => t.id));
  for (const t of incoming.tasks) {
    if (taskIds.has(t.id)) {
      skipped++;
      continue;
    }
    taskIds.add(t.id);
    if (!listIds.has(t.listId)) t.listId = INBOX_ID;
    state.tasks.push(t);
    added++;
  }
  for (const k of entryKeys) {
    const theirs = incoming.entries[k];
    const mine = state.entries[k];
    if (!mine || theirs.updated > mine.updated) {
      state.entries[k] = theirs;
      added++;
    } else skipped++;
  }
  saveState();
  render();
  alert(`Imported ${added} item(s)` + (skipped ? ` (${skipped} already present)` : "") + ".");
  return true;
}

const dataDialog = document.getElementById("data-dialog");
const dataTitle = document.getElementById("data-dialog-title");
const dataHint = document.getElementById("data-dialog-hint");
const dataText = document.getElementById("data-text");
const btnDataPrimary = document.getElementById("btn-data-primary");

function copyExportString() {
  dataText.focus();
  dataText.select();
  const done = (copied) => {
    btnDataPrimary.textContent = copied ? "copied" : "press Ctrl/Cmd+C";
    if (copied)
      setTimeout(() => {
        if (btnDataPrimary.textContent === "copied") btnDataPrimary.textContent = "copy";
      }, 1500);
  };
  const legacyCopy = () => {
    try {
      return document.execCommand("copy");
    } catch (e) {
      return false;
    }
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(dataText.value).then(
      () => done(true),
      () => done(legacyCopy()),
    );
    return;
  }
  done(legacyCopy());
}

async function openExport() {
  dataTitle.textContent = "Export";
  dataHint.textContent = "Copy this string, then paste it into the import box on your other browser or machine.";
  dataText.readOnly = true;
  dataText.value = "generating…";
  btnDataPrimary.textContent = "copy";
  btnDataPrimary.onclick = copyExportString;
  dataDialog.showModal();
  dataText.value = await serializeState();
  dataText.focus();
  dataText.select();
}
document.getElementById("btn-export").addEventListener("click", openExport);
document.getElementById("btn-save-error-export").addEventListener("click", openExport);

document.getElementById("btn-import").addEventListener("click", () => {
  dataTitle.textContent = "Import";
  dataHint.textContent = "Paste an exported string. Lists, tasks, and entries are merged into what you already have.";
  dataText.readOnly = false;
  dataText.value = "";
  btnDataPrimary.textContent = "import";
  btnDataPrimary.onclick = async () => {
    const text = dataText.value.trim();
    if (!text) {
      dataText.focus();
      return;
    }
    if (await importString(text)) dataDialog.close();
  };
  dataDialog.showModal();
  dataText.focus();
});

document.getElementById("btn-data-close").addEventListener("click", () => dataDialog.close());

// ---------------------------------------------------------------------------
// Theme: light, dark, or follow the system. The header button is a quick
// toggle between light and dark; the settings dialog has the third option.
// ---------------------------------------------------------------------------

const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme() {
  const t = state.settings.theme;
  const dark = t === "dark" || (t === "system" && systemDark.matches);
  document.body.classList.toggle("dark", dark);
  document.getElementById("btn-dark-mode").textContent = dark ? "light" : "dark";
  document.body.dataset.pack = currentPack();
  document.body.dataset.paper = state.settings.paper;
  document.getElementById("header-mascot").innerHTML = mascotTag("waving", "mascot header-mascot");
}

systemDark.addEventListener("change", applyTheme);

document.getElementById("btn-dark-mode").addEventListener("click", () => {
  state.settings.theme = document.body.classList.contains("dark") ? "light" : "dark";
  saveState();
  applyTheme();
});

// ---------------------------------------------------------------------------
// Fullscreen
// ---------------------------------------------------------------------------

const btnFullscreen = document.getElementById("btn-fullscreen");

function updateFullscreenBtn() {
  const isFs = !!document.fullscreenElement;
  btnFullscreen.textContent = isFs ? "exit" : "fullscreen";
  document.body.classList.toggle("fullscreen", isFs);
}

if (typeof document.documentElement.requestFullscreen !== "function") btnFullscreen.hidden = true;

btnFullscreen.addEventListener("click", () => {
  try {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  } catch (e) {
    /* ignore */
  }
});
document.addEventListener("fullscreenchange", updateFullscreenBtn);

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

applyTheme();
render();
checkReminders();
