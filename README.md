# kaps-c.github.io

Personal portfolio of Celest (Ciel) Teng, served by GitHub Pages at <https://kaps-c.github.io>.

Plain HTML, CSS and JavaScript. There is no build step: edit the files and push.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home page: intro, project cards, experience, education, skills |
| `snekboros.html`, `vuln-repair.html`, `cc-plus.html`, `multilingual-gpt2.html` | One write-up page per featured project |
| `card/` | Digital namecard (self-contained) |
| `404.html` | Page shown for broken links |
| `style.css` | All shared styles; colours are tokens at the top (light and dark) |
| `script.js` | Theme toggle, active section in the top bar, copy email |
| `media/` | Images and video used on the pages |
| `Celest-Teng-Resume.pdf` | Résumé linked from the home page |

## Editing notes

- **Colours:** change the tokens at the top of `style.css`. Each one is defined for light mode and again for dark mode.
- **Theme:** the small inline script in each page's `<head>` applies a saved light/dark choice before the page paints. Keep it in every new page.
- **New write-up page:** copy an existing one, then update the title, description, canonical URL, `og:` tags and the previous/next links.
- **Charts** are plain HTML/CSS (bars) or inline SVG (scatter), so they follow the theme. Values live in the `--v` style on each bar.
- **Accessibility:** keep one `<h1>` per page and don't skip heading levels; give every image `alt` text.
