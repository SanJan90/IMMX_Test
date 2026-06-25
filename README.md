# Parallax Video Demo

Een HTML-pagina die een video gebruikt als meebewegende (parallax) achtergrond.

## Gebruik

1. Plaats het videobestand **in dezelfde map** als `index.html` met exact deze naam:

   ```
   moving_the_ropes_light_turn_more_and_more_purple_wt83jrj3u7qhz86aoi25_1.mp4
   ```

   (Heeft jouw bestand een andere naam? Pas dan de `src` in `index.html` aan.)

2. Open `index.html` in de browser, of start een lokale server:

   ```bash
   python3 -m http.server 8000
   # open http://localhost:8000
   ```

3. Scroll — de video-achtergrond beweegt langzamer mee dan de tekst.

## Bestanden

- `index.html` — structuur van de pagina
- `style.css` — vormgeving, video vult altijd het scherm (`object-fit: cover`)
- `script.js` — parallax-effect via `scroll` + `requestAnimationFrame`

## Afstellen

- Parallax-snelheid: pas `SPEED` aan in `script.js` (0 = stilstaand, 1 = beweegt mee met scroll).
- Zoom van de video: pas `scale(1.15)` aan in `.video-bg video` in `style.css`.
