# Portfolio Website

This is a static portfolio/marketing site for Michael Angelo Lacuata, a freelance WordPress and web developer. It uses custom CSS (in `assets/style.css`) and vanilla JavaScript (`assets/script.js`) to create a clean, responsive, and interactive layout.

## Project Structure

```
/                      # repository root
├── index.html          # Main HTML document with sections for hero, about, skills, projects, testimonials, contact, etc.
├── assets/
│   ├── style.css       # Custom stylesheet with dark mode, animations, and SEO‑friendly utilities
│   └── script.js       # JavaScript handles navigation, filtering, form submission, and scroll animations
├── images/             # Image assets (profile, tools icons, project thumbnails)
├── sitemap.xml         # Sitemap for search engines
├── robots.txt          # Crawler instructions
└── README.md           # Project documentation
```

## SEO & Performance Enhancements

- Meta tags for description, keywords, canonical link, robots and theme color
- Open Graph and Twitter Card tags for social sharing
- Structured data (JSON‑LD) describing the person and website
- `sitemap.xml` and `robots.txt` included for indexing
- `loading="lazy"` on images and width/height attributes to reduce layout shift
- IntersectionObserver animations and fade‑in utilities for a polished user experience

## Customization & Deployment

- Update content directly in `index.html`; sections are marked with comments for easy editing.
- Adjust styles in `assets/style.css` or extend with Tailwind if preferred.
- Modify or extend interactivity in `assets/script.js`.
- Host on GitHub Pages, Netlify, Vercel, or any static file server.

## License

This site is governed by the MIT License.