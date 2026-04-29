# DigitalResume <span style="font-size:0.5em;"><em> - borgerod.no / borgerod.github.io</em></span>

### <span style="font-size:0.8em;">Description</span>

A digital resume and portfolio platform designed to showcase your professional experience, skills, and projects.

Built with Next.js, it features interactive components, structured work history, and project galleries. The site serves as both a personal branding tool and a dynamic CV, providing visitors with an organized overview of your background, achievements, and contact options. It also includes integrations for analytics, SEO, and links to external resources like GitHub and Figma.

### Technology Overview

| Category        | Technology / Tool       | Version    |
| --------------- | ----------------------- | ---------- |
| Framework       | Next.js                 | 16.1.7     |
| Language        | TypeScript              | 5.9        |
| Styling         | Tailwind CSS            | 4.2        |
| UI kit          | Hero UI                 | 3.0 (beta) |
| Deployment      | Vercel                  | -          |
| Package Manager | npm / yarn / pnpm / bun | latest     |
| Data structure  | JSON                    | -          |

<!-- TODO finish  -->

## Table of contents:

- [DigitalResume - borgerod.no / borgerod.github.io](#digitalresume----borgerodno--borgerodgithubio)
  - [Description](#description)
  - [Technology Overview](#technology-overview)
  - [Table of contents:](#table-of-contents)
  - [TODO:](#todo)
    - [Necessary](#necessary)
    - [Optional](#optional)
  - [Performance](#performance)
    - [LightHouse (SEO)](#lighthouse-seo)
    - [Vercel Speed Insights](#vercel-speed-insights)
  - [Page Map](#page-map)
  - [Data Overview](#data-overview)
    - [API Map](#api-map)
    - [Data Map](#data-map)
  - [Previews](#previews)
  - [Descriptions](#descriptions)
    - [BentoBoxBuilder](#bentoboxbuilder)
    - [LayoutBuilder](#layoutbuilder)
  - [Usage - how to install and run project](#usage----how-to-install-and-run-project)
    - [Installation](#installation)
    - [Deploy on Vercel](#deploy-on-vercel)

## TODO:

_a compilation of all todos for the repo._ <br>
_all of the todos found in the project files **should** be referenced here_

### <span style="font-size:0.8em;">Necessary</span>
- [ ] BUG FOUND - Opening images does not work -> 505 
- [ ] make readme look structured and nice
  - [x] add page map
  - [x] add previews
  - [x] add description
  - [ ] add description of ['layoutBuilder' ,'BentoBoxBuilder']
  - [x] add table of contents
  <!-- - [ ] add hyperlink to bug-report -->
  - [x] improve installation guide
  - [ ] make usage guide; (what images the user needs to add, and what data user needs to add and how it needs to be structured.)
- [x] BUG (3.0) fix bug in ImageGallery where image view sometimes refuses to close.
- [x] BUG (4.0) fix Images wont open on mobile mode (maybe other popups?)
- [ ] Analytics / SEO / AEO
  - [x] add vercel analytics
  - [x] enable vercel speed insight
  - [ ] implement SEO/AEO
    - [x] add metadata
    - [ ] implement SEO/AEO analysis
    - [x] implement lighthouse
      - [x] implement changes from analysis
    - [x] add CSP / nunce
- [x] add button redirecting to 'Github-repo' and 'Figma-project' in home
- [ ] WorkHistoryCard -> get feedback and pick color option 1 or 2 for chips
- [x] change color of portfolio-grid-buttons - while in tablet/mobile mode. it blends too much into the background and needs to be darker perhaps

### <span style="font-size:0.8em;">Optional</span>

- [ ] make ['layoutBuilder' ,'BentoBoxBuilder'] - 2.0:
  - [ ] make generator for 'layoutList'
  - [ ] look into more efficiant alternative algorithms
  - [ ] fine tune logic: something changed and the output is not optimal.
- [ ] Maybe turn BentoBoxBuilder into a stand-alone package. it seems usefull maybe other ones might like it.
- [ ] Maybe turn DigitalResume (this app) into a dynamic repo so other people can use it.
  - [ ] make the input of data simpler
  - [ ] make more robust stringhandler
- [ ] update job banners (logo long)
- [ ] make profile image maker that automatically removed background and crops accordingly. no manual laber.
- [ ] add tracking of visitors? note: prob would break gdpr but its a private website and I am tracking information of legal entities (employees of a business) and not private individual's personal data, so whatever.

## Performance

### LightHouse (SEO)

![Mobile 1](public/assets/images/lighthouse_review.png)

### Vercel Speed Insights

## Page Map

```mermaid
graph TD
  A[app]
  A1[page.tsx]
  A2[layout.tsx]
  A3[portfolio]
  A4[work-experience]

  A --> A1
  A --> A2
  A --> A3
  A --> A4

  A3 --> B1[page.tsx]

  A4 --> C1[job]
  C1 --> D1[slug]
  D1 --> E1[page.tsx]
```

## Data Overview

### API Map

![API-map-external](public/assets/images/api-map.png)

### Data Map

![Data Architecture](public/assets/images/data-architecture.svg)

## Previews

Here are some previews of the Digital Resume platform in action:

<details>
<summary>Home (Desktop)</summary>
<br>

![Home](public/assets/images/previews/preview-home.png)

</details>

<details>
<summary>Home (Mobile)</summary>
<br>

| Mobile 1
| --------------------------------------------------------------------
| ![Mobile 1](public/assets/images/previews/preview-home-mobile-1.png)
| ![Mobile 2](public/assets/images/previews/preview-home-mobile-2.png)

</details>

<details>
<summary>Home (iPad)</summary>
<br>

![iPad 1](public/assets/images/previews/preview-home-ipad-1.png)
![iPad 2](public/assets/images/previews/preview-home-ipad-2.png)

</details>

<details>
<summary>Job-page</summary>
<br>

full view of all jobs
![Full](public/assets/images/previews/preview-job-full.png)
closer look
![Job 1](public/assets/images/previews/preview-job-1.png)
![Job 2](public/assets/images/previews/preview-job-2.png)
Image gallery
![Gallery](public/assets/images/previews/preview-image-gallery.png)

</details>

<details>
<summary>Portfolio-page</summary>
<br>

| Portfolio
| -----------------------------------------------------------------
| ![Portfolio](public/assets/images/previews/preview-portfolio.png)

</details>

## Descriptions

_A quick overview of the core layout algorithms powering the platform._

### BentoBoxBuilder

A brute-force layout algorithm that organizes an array of strings into a dynamic bento grid — rows of cells where each cell has a text value and a col-span.

**How it works:**

- **Layout selection:** A predefined list of span combinations (e.g. `[2, 1]`, `[1, [1, 2]]`) is shuffled on each pass using a seeded PRNG, where the seed is derived from the total character count of the input. The algorithm then tries each layout until one fits the current queue of strings.
- **Fit checking:** A layout "fits" when the proportional widths it assigns (based on col-spans) roughly match the proportional lengths of the strings being placed. Longer strings get wider cells. An `effectiveLength` heuristic is also applied, which accounts for long single words that would overflow a narrow cell.
- **Nested cells:** Some layouts include stacked sub-cells (e.g. `[2, [1, 1]]`), where one column holds two vertically stacked items. These are handled as nested span arrays, and during assignment un-nested cells are prioritized and filled biggest-to-smallest before nested ones.
- **Anti-repetition:** The same layout structure is never used in two consecutive rows (compared by their reduced span ratios).
- **isHalved mode:** An optional flag that switches to a smaller layout pool and tighter minimum-span thresholds, intended for narrower/half-width containers.
- **Fallback handler:** If no layout fits with more than 2 items remaining in the queue, the algorithm falls back to a simpler two-cell row pass (`isolatedLayouts`) with a relaxed fit threshold. If a single item remains it is given a full-width span.

### LayoutBuilder

A layout decision algorithm that dynamically assigns CSS grid classes to three job card components — `jobCard`, `achiCard`, and `respCard` — based on how much text content each holds.

**How it works:**

- **Length measurement:** Each card's "size" is the total character count of its string data, rounded to the nearest 100. The `jobCard` acts as the baseline: its full text content sets a `lengthLimit` that the other cards are measured against.
- **Fit checking:** A card "fits" next to another when their lengths are within a configurable threshold percentage of each other. Three thresholds are used: a tight one for comparing individual cards against the job card, and a looser one for comparing `achiCard` directly against `respCard`.
- **Decision tree:** The algorithm works outside-in: it first checks whether both `achiCard` and `respCard` together fit the limit. If they do, the default layout is returned unchanged. If not, it progressively checks each card individually and their relative sizes to pick the least-disruptive layout change:
  - Both fit individually → move `respCard` to full-width below, let `achiCard` fill the gap
  - Only `achiCard` fits → `respCard` goes full-width below
  - Only `respCard` fits → `achiCard` goes full-width below
  - Neither fits, but they're similar in size → `jobCard` spans full width, both cards sit side by side below
  - Nothing fits → abandon grid entirely, fall back to `flex flex-col`

- **Design principle:** When a layout change is needed, the algorithm prefers the smallest deviation from the default. Single-card moves are preferred over restructuring the whole grid, which keeps the visual composition stable and predictable.

## Usage <span style="font-size:0.5em;"><em> - how to install and run project</em></span>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

yarn dev

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Borgerod/Borgerod.github.io.git
cd Borgerod.github.io
```

2. Install dependencies (choose one):

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server (choose one):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy on Vercel

NOTE: this is not a static site and cannot be used as a github.io, you have to host it somewhere else like vercel. to host it on github you need to replace the API data with static data. (will come in a future update)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
