# Scroll Video Demo

Een HTML-pagina met een vaste video-achtergrond waarbij de **scrollpositie de
afspeeltijd van de video bestuurt**: hoe verder je naar beneden scrollt, hoe
verder de video loopt.

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

3. Scroll — de video staat stil op de achtergrond en loopt mee met je scroll.

## Bestanden

- `index.html` — structuur van de pagina
- `style.css` — vormgeving, video vult altijd het scherm (`object-fit: cover`)
- `script.js` — koppelt de scrollpositie aan `video.currentTime`

## Afstellen

- Soepelheid: pas `SMOOTHING` aan in `script.js` (0–1; hoger volgt de scroll sneller).
- Hoe meer paginahoogte (meer/hogere secties), hoe langzamer de video per
  scroll-afstand loopt.

## Let op

- De video moet **muted** zijn om in browsers programmatisch bestuurd te kunnen
  worden (staat al ingesteld).
- Voor soepel scrubben helpt het als de video veel keyframes heeft. Lukt het
  scrubben schokkerig, her-encodeer dan met een laag keyframe-interval, bijv.:

  ```bash
  ffmpeg -i input.mp4 -g 1 -c:v libx264 -preset slow -crf 20 output.mp4
  ```
