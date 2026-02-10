# Frontend Design Skill

## Purpose

Help design and build visually polished, responsive, and accessible website interfaces. Use this skill when the user asks for help designing a website, creating UI components, building layouts, or improving the visual appearance of a web application.

## Guidelines

### Design Principles

- **Visual hierarchy**: Use size, color, contrast, and spacing to guide the user's eye to the most important content first.
- **Consistency**: Maintain uniform spacing, typography, color, and component styles throughout the design.
- **Responsiveness**: Design mobile-first and ensure layouts adapt gracefully across breakpoints (mobile, tablet, desktop).
- **Accessibility**: Follow WCAG 2.1 AA standards. Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text), keyboard navigability, semantic HTML, and appropriate ARIA attributes.
- **Whitespace**: Use generous padding and margins. Avoid cramming elements together. Let the design breathe.
- **Simplicity**: Prefer clean, minimal designs. Remove unnecessary elements. Every component should serve a clear purpose.

### Typography

- Use a clear typographic scale (e.g., 1.25 or 1.333 ratio) for headings and body text.
- Limit to 2-3 font families maximum (one for headings, one for body, optionally one for code/monospace).
- Set comfortable line heights: 1.5-1.75 for body text, 1.1-1.3 for headings.
- Keep line lengths between 45-75 characters for readability.
- Use relative units (`rem`, `em`) rather than fixed `px` for font sizes.

### Color

- Define a cohesive color palette with:
  - A primary brand color and its variants (lighter/darker shades)
  - A secondary/accent color for highlights and calls to action
  - Neutral grays for text, borders, and backgrounds
  - Semantic colors for success (green), warning (amber), error (red), and info (blue)
- Use CSS custom properties (variables) for all colors to enable easy theming and dark mode.
- Test color combinations for contrast compliance.

### Layout

- Use CSS Grid for page-level layouts and complex 2D arrangements.
- Use Flexbox for component-level alignment and single-axis layouts.
- Define consistent spacing using a scale (e.g., 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96).
- Use `max-width` containers to prevent content from stretching too wide on large screens.
- Apply responsive breakpoints thoughtfully:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Components

When building UI components:

- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`).
- Add smooth transitions for interactive states (hover, focus, active) with `transition: 150ms-300ms ease`.
- Design clear focus indicators for keyboard navigation.
- Include loading, empty, and error states for dynamic content.
- Build components to be composable and reusable.

### CSS Best Practices

- Use a CSS methodology (BEM, utility-first, or CSS Modules) consistently.
- Avoid `!important` unless absolutely necessary.
- Use logical properties (`margin-inline`, `padding-block`) for better internationalization support.
- Leverage modern CSS features: `clamp()` for fluid typography, `gap` for spacing, `aspect-ratio`, container queries.
- Organize styles from general to specific: resets, base/global styles, layout, components, utilities.

### Images and Media

- Use appropriate image formats: SVG for icons/logos, WebP/AVIF for photos, PNG for transparency.
- Always include `alt` text for images. Use empty `alt=""` for purely decorative images.
- Apply `aspect-ratio` or explicit dimensions to prevent layout shifts.
- Use `loading="lazy"` for below-the-fold images.
- Provide responsive images with `srcset` and `sizes` when serving multiple resolutions.

### Performance Considerations

- Minimize DOM depth and complexity.
- Avoid layout thrashing — batch DOM reads and writes.
- Use `will-change` sparingly and only for elements that will animate.
- Prefer CSS animations over JavaScript animations where possible.
- Limit the number of web fonts loaded; use `font-display: swap`.

### Dark Mode

When implementing dark mode:

- Use CSS custom properties for all themed values.
- Respect `prefers-color-scheme` media query for automatic detection.
- Avoid pure black (`#000`) backgrounds — use dark grays (`#111`, `#1a1a1a`) for less eye strain.
- Reduce image brightness/contrast slightly in dark mode.
- Test that all text remains readable and interactive elements are clearly visible.

## Output Format

When designing or reviewing frontend code:

1. Start by understanding the user's goals, target audience, and any brand/style requirements.
2. Propose a design approach before writing code when the scope is large.
3. Write clean, semantic HTML with well-structured CSS.
4. Include responsive behavior and accessibility features by default.
5. Add brief comments only where the design rationale is non-obvious.
6. When presenting designs, explain key decisions (color choices, layout strategy, component structure).
