#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"
OUT_FILE="$OUT_DIR/what-did-i-do.html"

mkdir -p "$OUT_DIR"

# Inline every piece of art as a data URI so the standalone file has no
# external references. app.js reads window.WDD_IMAGES["<folder>/<name>"]
# before falling back to <folder>/<name>.webp, and to an emoji glyph when
# neither exists.
IMAGES_JS="$(mktemp)"
trap 'rm -f "$IMAGES_JS"' EXIT
{
  printf 'window.WDD_IMAGES = {\n'
  for folder in icons stickers images; do
    for img in "$SCRIPT_DIR/$folder"/*.webp; do
      [ -e "$img" ] || continue
      name="$(basename "$img" .webp)"
      printf '  "%s/%s": "data:image/webp;base64,%s",\n' "$folder" "$name" "$(base64 -w0 "$img")"
    done
  done
  printf '};\n'
} > "$IMAGES_JS"

awk -v dir="$SCRIPT_DIR" -v images="$IMAGES_JS" '
  /href="style.css"/ {
    print "    <style>"
    while ((getline line < (dir "/style.css")) > 0) print line
    print "    </style>"
    next
  }
  /src="app.js"/ {
    print "    <script>"
    while ((getline line < images) > 0) print line
    print "    </script>"
    print "    <script>"
    while ((getline line < (dir "/app.js")) > 0) print line
    print "    </script>"
    next
  }
  { print }
' "$SCRIPT_DIR/index.html" > "$OUT_FILE"

echo "Built $OUT_FILE ($(du -h "$OUT_FILE" | cut -f1))"
