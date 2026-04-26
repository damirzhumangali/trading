# Atelier Landing Page

Single-page cinematic Vite app with a scroll-scrubbed hero frame sequence, warm liquid-glass styling, motion-driven editorial sections, and placeholder-safe media fallbacks.

## Run locally

```bash
npm install
npm run dev
```

## Hero frame pipeline

The hero is a canvas-based frame sequence, not a `<video>` tag.

1. Drop the source video at `/input/source.mp4` in the project root.
2. Create the input and frame folders:

```bash
mkdir -p input public/frames
```

3. Extract the frames with `ffmpeg`:

```bash
ffmpeg -i input/source.mp4 \
  -vf "fps=30,scale='min(1920,iw)':'-2':flags=lanczos" \
  -q:v 3 \
  public/frames/frame_%04d.jpg
```

4. Count the extracted frames and update `FRAME_COUNT` in [src/lib/constants.ts](/Users/damirfile/Desktop/Новая папка 5/src/lib/constants.ts):

```bash
ls public/frames | wc -l
```

5. If you switch to WebP, update both `FRAME_EXT` in [src/lib/constants.ts](/Users/damirfile/Desktop/Новая папка 5/src/lib/constants.ts) and the preload link in [index.html](/Users/damirfile/Desktop/Новая папка 5/index.html).

Optional WebP conversion:

```bash
# for f in public/frames/*.jpg; do
#   cwebp -q 82 "$f" -o "${f%.jpg}.webp" && rm "$f"
# done
```

Notes:

- `/input` is gitignored.
- `public/frames` is expected to ship with the app.
- If you deploy to a 25 MB target such as Vercel Hobby, keep the total frame payload under 20 MB.
- If `ffmpeg` is unavailable locally, document a future fallback with `@ffmpeg/ffmpeg` in `scripts/extract-frames.mjs`. It is intentionally not implemented yet.

## Placeholder media

Two background videos are still intentionally marked as placeholders:

- `STATS_BG_VIDEO`
- `CTA_BG_VIDEO`

Update them in [src/lib/constants.ts](/Users/damirfile/Desktop/Новая папка 5/src/lib/constants.ts) with an MP4 or HLS `.m3u8` URL. The app already supports lazy HLS attachment with `hls.js`.

## Verification checklist

- `npm run dev`
- `npm run build`
- Confirm the hero warning banner disappears after frames are extracted.
- Confirm the marquees loop without seams.
- Confirm the accordion opens cleanly on desktop and mobile.
# trading
# trading
