# Image-generation prompt

Art for "What Did I Do?": an owl mascot, five mood faces, 48 list icons, about 40 journal stickers, and three empty-state illustrations. Generated with ChatGPT Images (https://chatgpt.com/images/), stored as WebP with a transparent background. Every piece has an emoji fallback in `app.js`, so generate in any order and ship whatever is approved.

## Guidelines for reliable generation

Carried over from generating the 42 exercise cards for Did I Move?, plus what this set needs.

1. **Prove transparency first.** Generate the owl mascot alone and download the PNG. Open it on a checkerboard or run `identify -format '%[channels]\n' owl.png` (expect `srgba`). If the background comes back as a filled cream square, add "PNG with alpha channel, NO background, NOT a cream square" to the request and try once more. If it still fails, stop and switch to plan B: request every asset "on a flat circular cream disc (#fffdf6)" and accept a disc in both themes.
2. **Paste the whole prompt once, then request one asset per message.** The owl sets the character and style. Approve it before continuing; every later asset is generated "in the style of" the approved owl.
3. **Never send a bare name.** Always send the asset's full block from the catalog below, prefixed with its number and name, and suffixed with: *"One image, no text, no labels, transparent background, same style as the approved owl."*
4. **Name what the asset is NOT when a neighbour is similar.** "This is a paper CLIP, not a safety pin." "Sleeping owl, eyes CLOSED, not the thinking owl." Put the negative in capitals.
5. **Icons in batches of ten,** then check every one at 24 px on both a cream (#fffdf6) and a near-black (#111111) swatch before the next batch. Wrong icons look plausible at full size. What goes wrong is never the drawing; it is the wrong object, extra text, a poster instead of a single image, or a filled background.
6. **Expect one hang per session.** Press stop and resend the same text.
7. **Downloads.** Each image is a `blob:` in the page. Use the share button's Download option or "save image". Chrome may pause after the first few automatic downloads until you allow multiple downloads for the site.
8. **After export:** convert and drop into the matching folder. The file name is the key from the catalog.

```sh
cwebp -q 80 -resize 128 0 in.png -o icons/<key>.webp          # list icons, mood-<key>
cwebp -q 80 -resize 256 0 in.png -o stickers/<key>.webp       # stickers, owl poses
cwebp -q 80 -resize 512 0 in.png -o images/owl-<pose>.webp    # empty-state illustrations
du -ch icons stickers images | tail -1                        # stay under about 1.0 MB
```

Keep PNG originals in `images-original/` (ignored by git); they are about 0.4 to 1.1 MB each.

## Lessons from the first full run (September 2026)

- Transparency worked first time: every asset came back as a 1254x1254 PNG with a real alpha channel.
- The generator produced a clean single image for 99 of 101 requests. Once it returned a 3-icon strip (cropped locally); once it kept smearing dark blotches over a green fill no matter how the request was phrased. The fix was to generate mood-good and mood-great in the same olive-yellow as mood-okay and recolor the flat fill locally with `convert in.png -fuzz 9% -fill "#5a9e5e" -opaque "#b9a542"`.
- The chat UI often stops updating mid-generation and shows "Thinking" forever while the image has in fact finished. Reloading the thread reveals it. About one reload in three fails with "Could not load this ChatGPT conversation"; the Retry button fixes it.
- Sending a message while the page is still loading silently drops it. Confirm the text appears in the thread before waiting on it.

---

Create a consistent library of small flat illustrations for "What Did I Do?",
a friendly daily planner and journal app.

## Character

A small round owl, the app's mascot:
- Round body, big round eyes, tiny beak, two small ear tufts, stubby wings.
- Warm amber-brown feathers (#d9903a) with a cream face and belly (#fffdf6).
- Calm, kind, a little sleepy. Never scary, never cartoon-frantic.
- Sometimes holds a pencil or a small notebook.

## Art direction

- Clean flat vector style with restrained shading, one soft shadow at most.
- Outlines are a mid-tone grey (#555555), about 2 px at 1024 px, so they
  read on both a cream page and a near-black one. NOT black, NOT dark charcoal.
- Palette: amber #d9903a, cream #fffdf6, forest green #2e7d4f, slate blue
  #3b7dd8, soft red #c43d2c, plum #7a6bb5, and the grey outline. Small
  accents only outside this list.
- TRANSPARENT BACKGROUND. PNG with an alpha channel. No card, no border,
  no cream square, no drop shadow on the ground.
- Square canvas. The subject fills about 80% of the frame, centered.
- No text, no letters, no numbers, no labels, no watermark.
- One subject per image. No grids, no sheets, no multiple variants.

## Catalog

### Mascot poses (stickers/owl-<pose>.webp, 256 px; images/owl-<pose>.webp, 512 px)

#### 01. owl-waving
The owl standing, one wing raised in a friendly wave, eyes open, small smile.

#### 02. owl-writing
The owl hunched happily over a small open notebook, pencil in one wing,
eyes looking down at the page. NOT waving.

#### 03. owl-sleeping
The owl with eyes CLOSED, a tiny "z" shape is NOT allowed (no text), head
tilted, wings tucked, a small crescent moon floating beside it.

#### 04. owl-celebrating
The owl with both wings up, eyes wide and happy, three or four confetti
shapes around it. NOT the waving pose (both wings up, not one).

#### 05. owl-thinking
The owl looking up and to the side, one wing tip touching its beak, a
small hollow thought-bubble outline above (empty, no text).

### Mood faces (icons/mood-<key>.webp, 128 px)

Five round faces, same size and style, the face fills the frame. Each is a
plain round face in the mood's color with the grey outline. NOT the owl.

#### 06. mood-awful
Soft red (#c43d2c) face, eyebrows down, mouth a downward curve, one small
tear. Clearly the worst of the five.

#### 07. mood-meh
Amber (#d9903a) face, flat eyebrows, mouth a slight downward tilt.
Disappointed, NOT crying.

#### 08. mood-okay
Olive-yellow (#b9a53c) face, neutral straight mouth, neutral eyes.

#### 09. mood-good
Leaf green (#5a9e5e) face, gentle closed-mouth smile, relaxed eyes.

#### 10. mood-great
Forest green (#2e7d4f) face, wide open smile, eyes squeezed happy,
two small sparkles beside it. Clearly the best of the five.

### List icons (icons/<key>.webp, 128 px)

Simple single objects, front or three-quarter view, filling the frame.
Each is ONE object, no scene, no hands, no owl.

11. inbox — an open paper tray with one sheet in it
12. home — a small house with a door and a chimney
13. work — a briefcase with a clasp
14. study — a graduation cap on top of one book
15. shopping — a shopping cart, side view
16. health — a round pill and a capsule
17. money — a coin with a plain circle, NOT a dollar sign (no text)
18. family — three overlapping round heads, two tall one short
19. travel — a small airplane, three-quarter view
20. chores — a broom leaning, bristles down
21. ideas — a light bulb, lit
22. books — a stack of three books
23. fitness — a dumbbell
24. food — an apple with a leaf
25. pets — a paw print
26. garden — a watering can
27. music — a single musical note
28. art — a paint palette with four color blobs and a brush
29. phone — a smartphone, screen blank
30. car — a small car, side view
31. gift — a wrapped box with a bow
32. medical — a stethoscope
33. birthday — a slice of cake with one candle
34. coffee — a mug with a curl of steam
35. cleaning — a spray bottle
36. laundry — a wicker basket with folded cloth
37. bills — a receipt with a zigzag bottom edge, NO printed text (blank lines)
38. mail — a closed envelope
39. meeting — a wall calendar page with a blank grid, NO numbers
40. code — a laptop, screen blank
41. game — a game controller
42. movie — a clapperboard
43. sleep — a crescent moon with one star
44. water — a single water drop
45. plant — a potted plant with three leaves
46. heart — a heart
47. star — a five-point star
48. flag — a small flag on a pole
49. bell — a bell
50. pin — a push pin
51. lock — a closed padlock
52. key — a key
53. camera — a compact camera
54. sun — a sun with short rays
55. moon — a crescent moon alone, NOT the sleep icon (no star)
56. cloud — one cloud
57. umbrella — an open umbrella
58. leaf — a single leaf
59. trophy — a trophy cup

### Stickers (stickers/<key>.webp, 256 px)

Playful, slightly rounder than the icons. Small decorations may have a
hint of paper texture but stay flat.

60. sunny — sun with a small smiling face
61. rainy — a cloud with three drops
62. snowy — a cloud with three snowflakes
63. rainbow — a rainbow arc
64. windy — three curled wind lines with two leaves
65. stormy — a cloud with a lightning bolt
66. coffee — a takeaway cup with a lid and a heart on the sleeve (a HEART, not text)
67. tea — a teacup on a saucer with steam
68. pizza — one slice of pizza
69. cake — a whole small cake with one cherry
70. salad — a bowl of greens
71. cookie — a chocolate chip cookie with one bite taken
72. run — a running shoe
73. bike — a bicycle, side view
74. yoga — a rolled yoga mat
75. swim — a pair of swim goggles
76. walk — two footprints
77. nap — a pillow with a small crescent moon
78. book — an open book
79. movie — a striped popcorn box
80. music — a pair of headphones
81. game — a die showing five dots
82. paint — a paintbrush with a drip
83. camera — an instant photo print, blank
84. love — a heart with a smaller heart beside it
85. sparkle — three four-point sparkles of different sizes
86. fire — a small flame
87. party — a party popper with confetti
88. star — a star with a smiling face
89. cry — a single teardrop with a sad face
90. hug — two round blobs leaning into each other
91. laugh — a round face laughing, eyes closed, mouth wide open
92. think — a round face with a raised eyebrow and a finger on its chin
93. tired — a round face yawning, eyes half closed
94. sick — a round face with a thermometer in its mouth
95. proud — a flexed arm
96. tape — a strip of washi tape, torn ends, plain amber pattern
97. clip — a paper CLIP, NOT a safety pin
98. pin — a round-headed push pin, red head
99. note — a small square sticky note, blank, one corner curled
100. check — a check mark inside a circle
101. flower — a single five-petal flower

### Empty-state illustrations (images/owl-<pose>.webp, 512 px)

Reuse the approved 01, 02, and 05 owl poses at the larger size. No new
generation needed unless you want a scene; if you do, keep the owl alone,
NO furniture, NO text.

## Workflow

Start by generating 01, owl-waving, only, with a transparent background.
Wait for my confirmation that the PNG has an alpha channel before generating
anything else. When I give a number or name, generate only that asset. Use
the approved owl as the visual reference for all subsequent assets. Do not
claim to have generated any files or assets that are not actually included
in your response.

### Mascot packs (stickers/<pack>-<pose>.webp 256 px, images/<pack>-<pose>.webp 512 px)

Each pack repeats the five owl poses (waving, writing, sleeping, celebrating,
thinking) with a different character. Generate the waving pose first as the
pack's style reference, then the other four "same character as the approved
<pack>". Register nothing: `app.js` derives file names from the pack key.

#### duck
A small round DUCK. Round body, big round eyes, a wide flat orange bill, tiny
orange feet, stubby wings, a single curl of feathers on top of its head. Sunny
yellow (#f2c94c) feathers with a cream belly. Calm, kind, a little sleepy.

#### cat
A small round CAT, sitting. Round body, big round eyes, two pointed ears, a
tiny pink nose, three short whiskers each side, a curled tail. Warm grey
(#b9b0a6) fur with a cream chest and muzzle, pink (#e88db3) inner ears. Calm,
kind, a little sleepy. NOT the owl, NOT the duck.
