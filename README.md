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

## Hoe het werkt

- Naar beneden scrollen laat de video **echt vooruit afspelen** (frame voor
  frame, dus soepel) op een snelheid die meeschaalt met je scroll — geen
  schokkerig "springen" naar tijdsposities.
- Aan het einde van de video vult een **paarse sluier** het scherm. Die kleur
  wordt automatisch uit de laatste frame van de video gesampled, dus het is
  precies de tint die in de video voorbijkomt.
- Daarna scroll je de **echte pagina** (`.real-page`) in, die naadloos verder
  gaat in dezelfde paarse kleur.

## Afstellen

- Snelheid van het soepel afspelen: pas de factor in `clamp(diff * 6, 1, 16)`
  aan in `script.js`.
- Wanneer het paars invult: pas `smoothstep(0.82, 1.0, ...)` aan (0.82 = vanaf
  82% van de scrub-zone).
- Hoeveel scroll de video duurt: voeg secties toe/weg in de `.scrub`-div, of
  maak ze hoger.

## Let op

- De video moet **muted** zijn om programmatisch afgespeeld te kunnen worden
  (staat al ingesteld).
- De kleur-sampling werkt het best via een lokale server (`python3 -m
  http.server`). Bij openen via `file://` kan de browser het uitlezen van de
  video blokkeren; dan wordt de CSS-fallbackkleur `--end-color` gebruikt.
