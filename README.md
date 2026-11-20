# Memora — a life, lovingly kept

A high-fidelity, bilingual UI concept for **Memora**, a warm diary and memoir app made for older adults and the family who loves them. Two editions, one design system: **English** and **繁體中文**. It is an interactive prototype: no backend, no real AI, no real calls, no data leaves the page.

- **預設 / 繁體中文:** `index.html` — or double-click `Start Memora.cmd`.
- **English:** `index-en.html` — or double-click `Start Memora English.cmd`.
- **舊連結:** `index-zh.html` redirects to the Chinese default.
- **Switch language inside the app:** open **Settings → Interface → Language**. Home is intentionally language-clean.
- **Design review:** `Memora_UI_Design.pdf` (English edition) · **Web version:** `showcase.html`.

**Revision 4:** Home has no Continue card and no language control; the photo and song starts are full-width horizontal rows. Memories opens a stitched leather memoir cover — photo, title plaque, counts, edit actions and **Open the book** — that flips open to the table of contents. The four bottom tabs now grow in height, icon size and label size with the reading size.

---

## The concept

Memora is built around one idea: a life story should feel like a book, not a database.

The companion is **Momo**, a smiling open book — adapted from the supplied reference image into a die-cut character who can sit on the Home card, listen in a chat, or step out of the avatar frame during a call. The interface uses warm paper, terracotta, sage, honey, generous serif headings and very large touch targets. It is deliberately closer to an heirloom than to productivity software.

The demo follows **Margaret “Maggie” Chen, 74**, through six life chapters that begin at childhood:
**Childhood → Becoming Me → Love & Family → Work & Purpose → Widening World → This Chapter.**

---

## Two editions, one warmth

- **English** uses Source Serif + Segoe UI. **繁體中文** uses Noto Serif TC for display, Noto Sans TC / PingFang TC / Microsoft JhengHei for UI. The English presentation chrome is hidden in the Chinese edition so only the app remains on screen.
- Every visible string is localised: screens, chapter data, call lines, sheets, empty states, toasts and the call-to-chat transcript. The runtime dictionary lives in `i18n-zh.js`; the static Chinese page is the default `index.html`, with English in `index-en.html`.
- The root is **always Chinese**. Language choice lives in **Settings → Interface → Language**; Home has no language control. Switching reloads the current screen and preserves the current text size. `index-en.html` is the deliberate English entry and always opens in English, whatever the browser language. The root never switches to English by itself.
- Large text is not just a scale. At **27–30 pt**, Home keeps the primary card and both horizontal starts visible, song titles get a third line, decade filters become a 3-column grid, chapter titles wrap, call controls and family names reflow, the four bottom tabs grow in height, icon and label, and all screens scroll instead of clipping. This has been checked at 30 pt in both English and Chinese.

---

## How the brief is answered

| Brief | What the prototype does |
|---|---|
| **English + 繁體中文, iOS 27 direction, icons + labels** | Two complete editions with a language switch, floating glass tab bar, large radii, bottom sheets, soft depth. Every meaningful icon has a plain-language label. |
| **Must-have large text mode, 20–30 dp, adjustable** | A live 20–30 pt control, first in Settings. At 27–30 pt the layout reflows, not just scales: all three Home starts stay visible, titles get extra lines, controls wrap, and the bottom tab bar grows in height, icon and label. Pages scroll instead of clipping. Tested in both languages. |
| **Home: three ways to start** | Talk with Momo as the primary card, then two full-width horizontal rows: start from a photo, start from a song. No Continue card; the language control lives in Settings only. |
| **Continue card removed** | Home is now a clear landing page: one primary way and two horizontal secondary ways. Saved and unfinished memories live in the book. |
| **Four tabs: Home, Family, Memories, Settings** | Present on Home, Family, the life book, Music and Settings; hidden in focused flows such as chat, call and film making. |
| **AI chat: typing + voice** | Hold the mic to record, release to send. A simulated iOS keyboard carries the **Send** key in the keyboard position. |
| **Add photo or music mid-chat** | The `+` composer opens a sheet for a photograph, a song, or a voice note; selections appear in the thread. |
| **Finish / end in the top-right** | A clay **Finish** button is pinned top-right through the conversation, opening a chapter/title save sheet. |
| **Hide own avatar** | Conversation settings include “Show my photo”, off by default. User messages are clean text bubbles until enabled. |
| **Switch to a call; mute, speaker, hang up** | Phone icon in the chat header opens the full-screen companion call. Mute, Read aloud, Text and End are labelled controls. |
| **Read aloud on/off** | Available in conversation settings and the call’s speaker control. Captions can be toggled independently. |
| **Family: add family placement** | Two obvious places: **Add** at the top-right of Family, and an **Add family** chair at the end of the family row. |
| **Family shared album vs private album** | Two distinct cards: sage **Family album** (“Shared with 3”) and dark cocoa **My private album** (“Only you”). Different colours, locks and badges; no description copy. |
| **Family watched your video: message, hidden before opening** | “Quiet updates”: a veiled memory title, a Reveal action, then a named view with just an Open action. No likes, no comments, no reply. |
| **Memory library as a book, life chapters from childhood** | Memories opens a stitched leather memoir cover — cover photograph, title plaque, memory/chapter counts, rename/cover actions and **Open the book**. Opening flips to the table-of-contents page with ribbon, page edges and page-turn animation. Tapping the Memories tab again returns to the cover. |
| **Generate a memory video; tick which memories** | “Make a memory film” → selectable memory cards with large checkboxes → one warm look and one song → a full-screen cinema preview. |
| **Memory detail delete, second confirmation** | Delete sits in the page menu; choosing it opens a second **Delete this memory?** dialog with Keep it / Delete. |
| **Music by decade, search, identify** | Decade chips, search field, and a “Listen & identify” flow. |
| **Preview first, then Use** | A song must be previewed; only then does **Use this song** appear. Previewing never selects. |
| **Music only as memoir background** | The chosen track is labelled “Chosen for your memoir” and is used beneath the memory film. |
| **Music pauses whenever audio plays** | Music preview stops on entering a call or starting a voice recording. There is no explanatory switch. |
| **No “background music” switch in Settings** | There is no such switch; automatic pausing is the behaviour. |
| **Call: cartoon character emerging from avatar frame** | With text off, Momo fills the frame and extends past its edge. With text on, Momo steps back and the words take the centre. One classic Momo — no appearance menu. |
| **Text show/hide in call** | Text opens a centred two-line transcript: the newest line is large, and the previous line shrinks and fades. End or the down arrow returns to the chat and appends the call as messages. All four call controls use icons **and** labels. |
| **Warm, not work software; not over-simplified** | Photographs, taped corners, book stitching, ribbons, handwriting-adjacent serif type, a companion, quiet moments. No dashboards, streaks or scores. |
| **“Make it a book” / Table of Contents** | The life book, chapter pages and memory pages share a single book language. The list has become a table of contents. |

---

## Design system at a glance

- **Paper:** `#F5ECDD` / warm surface `#FFFCF5`; **ink** `#2B211A`; **clay** `#B6533B`; **sage** `#687B5F`; **honey** `#C98C40`.
- **Type:** Source Serif + Segoe UI in English; Noto Serif TC + Noto Sans TC (with PingFang/JhengHei fallbacks) in Traditional Chinese; 22 pt body at the default, adjustable 20–30 pt.
- **Shape:** 24–32 px radii, 1 px warm outlines, soft warm shadows, minimal glass only where it clarifies layering.
- **Touch:** 56 px minimum targets; every control has a label or an accessible name.
- **Motion:** slow, interruptible page turns, breathing companion, gentle sheet transitions; `prefers-reduced-motion` respected.
- **Tone:** plain, warm English and Traditional Chinese. No jargon, no scores, no urgency.

---

## Improvement ideas, beyond this prototype

These are the ideas most worth carrying into a next round:

1. **A question for today** — one gentle prompt at the top of Home that disappears after it is answered. It turns an empty home into a beginning without adding a feed.
2. **A memory map** — chapters pinned to real places. A place is often an easier door into a memory than a date.
3. **A printed heirloom** — once a year, offer a clothbound print of the book. Make the digital archive holdable.
4. **Voice capture from the lock screen** — a large widget that starts a memory with one hold. The best capture flow begins before the app opens.
5. **A comfort check at first launch** — a 60-second setup for text size, voice and contrast, before the first memory. Accessibility should arrive first.
6. **Listen together** — a scheduled family listening moment around a film: everyone presses play at the same time. No comments, no feed; just a shared evening.
7. **Letters for later** — write a memory to be opened on a future birthday or anniversary. Legacy as care, not notification.
8. **A page to send** — turn one memory into a beautiful PDF or audio postcard. Small, intentional sharing.
9. **A reading view that hides chrome** — at 30 pt, let a memory page become a full-screen reading surface with only page-turn and read-aloud controls.
10. **A “this day in your life” shelf** — one quiet card in the book that resurfaces an old page on its anniversary, never as a pushy notification.

**Deliberately absent:** likes, comments, streaks, leaderboards, follower counts, a background-music switch, and a blank “post” box.

---

## Prototype notes & limits

- All AI replies are scripted; calls are visual only; the timer is simulated.
- Music preview is an interaction state, not real audio playback. The prototype stops the preview on entering a call or recording to demonstrate the auto-pause rule.
- Read-aloud and voice input are presentation states; no microphone or speech-synthesis permission is requested.
- The photo assets are local prototype imagery and the companion cutout is locally processed from the supplied reference.
- At the largest text size, screens scroll rather than clip. The bottom tab bar remains fixed and labelled.
- For a quick live text-size demo, the English presentation sidebar has the same 20–30 pt slider as Settings. The Chinese edition is phone-only and uses the in-app slider.

---

## File map

```
memora-studio/
  index.html                 Traditional Chinese interactive prototype (default entry)
  index-en.html              English interactive prototype
  index-zh.html              legacy /index-zh.html redirect to the Chinese default
  styles.css                 base design system and screen layout
  fixes.css                  late refinements and large-type chrome
  revision.css               home rows, memoir cover and scalable tab bar
  app.js                     navigation, sheets, chat, music, film, call, settings
  showcase.html              six-page design review (web)
  showcase.css
  Memora_UI_Design.pdf       English design review (6 pages, 1600×1000)
  i18n-zh.js                 runtime Chinese dictionary (sheets, call, chapters, toasts)
  README.md
  Start Memora.cmd           opens the Chinese default
  Start Memora English.cmd   opens the English edition
  Start Memora 繁體中文.cmd    alias for the Chinese default
  assets/
    momo.png                 cutout companion
    momo-source.png          supplied reference
    photos/                  local memory imagery
    fonts/                   Source Serif and Segoe UI
  shots/
    redesign-grid.png        Home 22 pt / Home 30 pt / memoir cover
    final-*.png              English screen captures used in the review
    zh-*.png                 Traditional Chinese screen captures
    showcase-*.png           rendered review pages
```

**Run locally:** double-click `index.html` (Chinese default), `index-en.html` (English), or use `Start Memora.cmd`. No build step, server or package install is required.

**Deployment:** this is a static site. Publish the whole `memora-studio` folder (or its contents) with an empty build command and the publish/output directory set to the folder root. `index.html` is the Chinese default entry; `index-en.html` is the English entry; `index-zh.html` is a small legacy redirect. Upload both HTML editions together with `i18n-zh.js`, `app.js`, `styles.css`, `fixes.css`, `revision.css` and `assets/` — uploading only `index.html` leaves the EN button with nowhere to go. Netlify Drop, Cloudflare Pages direct upload, GitHub Pages and Vercel all work without a build step.

**Demo path:** Home → Talk with Momo → hold the mic or type → `+` to add a photo/song → call Momo → tap **Text** to see the focused transcript → **End**. The call lines become chat messages. Then open **Memories** to turn through the book, preview a song, make a film, and visit **Settings** to drag text size from 20 to 30. Switch to **繁體中文** from **Settings → Interface → Language**; the same flow, chapter data and call transcript are localised.
