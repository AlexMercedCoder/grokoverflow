# Architecture Documentation

## Overview
GrokOverflow is a personal blog and portfolio website built using **Next.js**. It serves as a platform for sharing blog posts, podcasts, and videos. The content is primarily managed through Markdown files, which are processed and rendered statically.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (v12.1.0) - React framework for production.
- **Runtime:** Node.js
- **Styling:** CSS Modules & Global CSS
- **Content Processing:**
    - `gray-matter`: Parsing front-matter from Markdown files.
    - `markdown-it`: Rendering Markdown to HTML.
    - `highlight.js`: Syntax highlighting for code blocks.

## Directory Structure
- **`/pages`**: Contains the application routes.
    - `_app.js`: Custom App component for global styles and layout.
    - `index.js`: The homepage.
    - `[...slug].js`: Dynamic routes for blog posts (likely structure, though not explicitly seen in top-level list, implied by `posts` dir).
- **`/components`**: Reusable React components.
    - `Layout.js`: Main layout wrapper including Header and Footer.
    - `Header.js`: Navigation bar.
    - `Footer.js`: Site footer.
- **`/styles`**: CSS files.
    - `globals.css`: Global styles and CSS variables.
    - `*.module.css`: Component-specific styles.
- **`/posts`**: Directory containing Markdown files for blog posts.
- **`/public`**: Static assets like images.

## Data Flow
1.  **Content Creation**: Content is written in Markdown files located in the `/posts` directory.
2.  **Build Time**: Next.js `getStaticProps` and `getStaticPaths` (likely used in page files) read the Markdown files.
3.  **Rendering**:
    - `gray-matter` parses metadata (title, date, etc.).
    - `markdown-it` converts the Markdown body to HTML.
    - React components render the content.
4.  **Client Side**: The site is served as static HTML with React hydration for interactivity.

## Styling System
- **Global Styles**: Defined in `styles/globals.css`, setting up fonts, basic resets, and CSS variables for colors.
- **Component Styles**: Scoped CSS using CSS Modules (e.g., `Header.module.css`) to prevent style leakage.
- **Theming**: Uses CSS variables (`--main-color-1`, `--main-color-2`) for consistent coloring.
