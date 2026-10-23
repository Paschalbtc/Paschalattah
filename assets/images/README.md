# Portfolio photos

## Headshot

The homepage uses `MY Picture.jpeg` as its headshot. To use another portrait, replace the image `src` in the hero section of `index.html`. A portrait-oriented image works best.

## Event gallery

The Bitget event card already displays `bitget.jpeg` and `bitget2.jpeg` side by side. Click either photo to open it in the full-size preview.

Put your event photos in this folder's `events/` subfolder, then replace the matching image paths in the gallery section of `index.html`:

- `events/bitget-global-meetup.jpg`
- `events/token2049-networking.jpg`
- `events/gateio-community.jpg`
- `events/zilliqa-ecosystem.jpg`

Each gallery card includes its own image path, alt text, event title, category, and year. Change `ADD YEAR` to the event's year. Until a photo is added, a branded placeholder is shown; clicking the card opens a photo preview.

JPG, PNG, and WebP images work. If you use another extension or filename, update both the `<img src>` and that card's `data-gallery-image` path in `index.html`.
