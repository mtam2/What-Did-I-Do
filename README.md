# What Did I Do?

A daily planner and journal. Plan your day, tick things off, write a few lines about how it went, and watch the month fill in. It answers one question: what did I do today?

## Philosophy

**Add less. Ship less. Worry less.**

This app is a single HTML file -- no frameworks, no bundlers, no CDN links, no server, no build step you didn't ask for. Open it in a browser and it works, even offline. Same lineage as [But Did I?](https://github.com/maximtam/But-Did-I) and [Did I Move?](https://github.com/maximtam/Did-I-Move).

All data lives in your browser's localStorage. Nothing leaves your machine. There's no account to create, no sync to configure, no privacy policy to read.

The feature list is deliberately short too. Tasks with a due date, one journal entry a day with a mood and a few stickers, a calendar, a streak. Planner apps don't fail because they lack a feature. They fail because opening them feels like work. A day here takes a minute to plan and a minute to close.

## Usage

Open `index.html` in any modern browser, or use the standalone `dist/what-did-i-do.html`.

**Today** -- the day's tasks on top, the day's journal below. Type in the box at the bottom of the task list and press + to add a task for this day. Tap the circle to tick one off. Tap the title to edit it, add notes, move it to another day, or set a reminder time. The arrows (or ← and → on a keyboard) step through days, so yesterday's entry is one tap away.

**Overdue** -- tasks from earlier days that never got done sit in a red block above today's list, each with a "→ today" button, or move them all at once.

**Unscheduled** -- tasks without a due date live in their list and in a fold at the bottom of today's list, where "→ today" pulls one onto the day.

**Journal** -- pick one of five moods, write as much or as little as you like (it saves as you type), and add stickers. While the box is empty, three starters sit under it (reflection, gratitude, tomorrow); tap one to drop a few plain-text prompts in and edit them however you like. Clearing everything from a day removes the entry.

**Tasks** -- every list as a row of chips. Inbox is always there; "+ list" makes another with an icon and a color. Open tasks show first, completed ones fold away underneath. Drag to reorder (press and hold on a touch screen).

**Journal tab** -- every past entry, newest first, grouped by month. Tap one to open that day. The bar at the top searches entry text and narrows by mood or a date range; the filters combine, and "clear filters" puts everything back.

**Search** -- both the Tasks and Journal tabs have a bar at the top. Tasks searches titles and notes and filters by list, open or done, and scheduled, unscheduled, or overdue. While anything is set, the tab shows the matching tasks from every list in one place. Everything is searched in your browser.

**Calendar** -- the month at a glance. A day shows its mood face, or its first sticker when there's no mood, or a small dot when you only wrote something, and the bar shows how many of that day's tasks got done. Tap a day to open it.

**Stats** -- your current and longest streak, a twelve-week contribution graph shaded by tasks completed, and this month's moods. A day counts toward the streak when it has a journal entry or at least one completed task. Filling in yesterday through the arrows counts too, on purpose.

**Reminders** -- give a task a "remind at" time and, while the page is open in a tab, the tab title shows "(!)" once that time passes and a system notification fires once (if you grant permission). Settings also has a daily journal reminder that nags once when the day has no entry yet. Neither can wake a closed browser; set a real alarm too.

**Mascot packs** -- settings lets you pick an owl, a duck, or a cat. The mascot sits next to the title, greets you on empty screens, and leads the sticker picker, and the accent color shifts to match: amber for the owl, sunny yellow for the duck, rose for the cat.

**Settings** -- mascot pack, theme (light, dark, or follow the system), which day the week starts on, the journal reminder, how much storage you're using, and two cleanup actions: clear completed tasks older than 90 days, or delete everything.

**Export / import** -- click "export" in the header and the app shows your lists, tasks, and entries as a single line of text tagged `WDD1Z:` (or `WDD1:` when the browser can't compress). Copy it, then on the other machine click "import", paste it in, and click "import". Lists and tasks you already have are kept; for a day you both wrote on, the newer entry wins.

## Deploying to GitHub Pages

The app is static, so GitHub Pages can serve the repository as-is:

1. Push this repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, and save.

A minute later the app is live at `https://<user>.github.io/<repo>/`. Every push to `main` updates it. The GitHub Actions workflow in `.github/workflows/build.yml` also builds and checks the standalone file on every push.

## Standalone file

The development version is split into separate files (`index.html`, `style.css`, `app.js`). To produce a single self-contained HTML file:

```sh
./build.sh
```

This outputs `dist/what-did-i-do.html` -- one file you can drop anywhere and open offline. Any art in `icons/`, `stickers/`, and `images/` is inlined as data URIs.

## Art

List icons, mood faces, stickers, and the owl mascot are generated with ChatGPT Images from the prompt in `image-prompt.md`, then stored as WebP with a transparent background. Every piece of art has an emoji stand-in, so the app is complete without a single image and still complete if one is missing. To add art, follow the workflow at the top of that file, export the PNG, then:

```sh
cwebp -q 80 -resize 128 0 in.png -o icons/home.webp        # list icons, mood faces
cwebp -q 80 -resize 256 0 in.png -o stickers/coffee.webp   # stickers, mascot poses
cwebp -q 80 -resize 512 0 in.png -o images/owl-waving.webp # larger illustrations
```

The file name is the key: `icons/<key>.webp` for entries in the `ICONS` table in `app.js`, `icons/mood-<key>.webp` for moods, `stickers/<key>.webp` for `STICKERS`, and `stickers/<pack>-<pose>.webp` plus `images/<pack>-<pose>.webp` for each mascot pack in `PACKS` (owl, duck, cat) across the five poses in `POSES`. To add a pack, add a key and emoji to `PACKS`, an accent block under `body[data-pack="..."]` in `style.css`, an option in the settings dialog, and generate the five poses. Keep PNG originals out of the repository (they're ignored under `images-original/`).

## FAQ

**Where is my data stored?**
In your browser's localStorage under the key `what_did_i_do`. It stays on your machine.

**How do I back up my data?**
Click "export" and save the string somewhere you trust. Paste it into "import" to merge it back in.

**How do I reset everything?**
Settings has a "delete everything" button. Or clear your cookies and site data for this website, or open the dev console and run `localStorage.removeItem("what_did_i_do")`, then refresh.

**Is there a lock or a password?**
No. Anyone who can open your browser can read your journal, the same as your browser history. If that matters, use a browser profile with its own login.

**Can I add my own icons or stickers?**
Yes. Add a key and an emoji fallback to the `ICONS` or `STICKERS` table at the top of `app.js`, and optionally drop a matching WebP in the folder.

**What browsers are supported?**
Any modern browser (Chrome, Firefox, Safari, Edge). No IE support.

**Why GPLv3?**
So the app stays free and open. If someone builds on it, their version must be open too.

## Contributing

**Zero dependencies.** Every feature must use only HTML5, CSS, and native JavaScript. No third-party libraries, frameworks, or external resources -- not even a CDN link.

**Build tooling stays simple.** The build script uses bash and awk. CI uses only standard GitHub Actions runners. No webpack, vite, rollup, or npm.

**Keep it offline-first.** The app must always work as a single file opened in a browser with no network connection. Run `./build.sh` and verify `dist/what-did-i-do.html` works standalone before submitting.

**Match the existing style.** Small app, flat file structure, no deep abstractions. Read the code before proposing changes.

## License

GNU General Public License v3.0 -- see [LICENSE](LICENSE).
