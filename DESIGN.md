# Design Brief

## Direction

PropFlow Real Estate CRM — Premium digital platform for professional lead management, built on trust, authority, and luxury positioning inspired by high-end real estate aesthetics.

## Tone

Refined and professional editorial — deep navy authority combined with warm gold accents, projecting premium real estate expertise without coldness. Card-based hierarchies with intentional whitespace.

## Differentiation

PropFlow branding as persistent visual anchor (logo top-left, all pages). Golden accent highlights on interactive elements create immediate luxury perception. Role-based dashboard layouts (Telecaller/Sales/Admin) with contextual summaries over generic tables.

## Color Palette

| Token          | OKLCH            | Role                                   |
| -------------- | ---------------- | -------------------------------------- |
| background     | 0.98 0.006 240   | Off-white with cool undertone          |
| foreground     | 0.18 0.014 240   | Deep navy text                         |
| primary        | 0.32 0.18 260    | Deep navy (authority, trust)           |
| accent         | 0.68 0.18 70     | Rich gold (luxury, CTAs)               |
| secondary      | 0.94 0.01 240    | Light background sections              |
| muted          | 0.92 0.008 240   | Muted UI elements                      |
| destructive    | 0.55 0.22 25     | Red (loss, closure actions)            |
| card           | 1.0 0.0 240      | Pure white cards                       |

## Typography

- Display: Space Grotesk — geometric, modern, headings & hero titles (h1–h3)
- Body: Satoshi — friendly professional, paragraphs, UI labels, table data
- Mono: Geist Mono — code blocks, dates, numeric displays (DD/MMM/YYYY format)
- Scale: h1 `text-4xl md:text-5xl font-bold tracking-tight` | h2 `text-2xl md:text-3xl font-semibold` | body `text-base` | label `text-xs font-semibold uppercase tracking-widest`

## Elevation & Depth

Subtle card elevation via borders and soft shadows. Header/sidebar elevated with primary color fill. Status badges use accent gold for "active" states. Alt-row background (secondary color) for table readability without harsh contrast.

## Structural Zones

| Zone    | Background  | Border            | Notes                                              |
| ------- | ----------- | ----------------- | -------------------------------------------------- |
| Header  | primary     | none              | Navy bg, white text, PropFlow logo + user menu    |
| Sidebar | primary     | none              | Navy navigation, gold accents on active links      |
| Content | background  | secondary bottom  | Off-white bg, alternating row colors (table rows) |
| Cards   | card        | border            | White with subtle 1px border, soft shadow         |
| Footer  | secondary   | border-top        | Light background, navy text, right-aligned footer |

## Spacing & Rhythm

6px base unit (0.375rem). Cards: 24px padding. Sections: 32px gap. Micro-spacing: 8px (inline), 12px (block elements). Table rows: 16px vertical padding. Tight vertical rhythm on dashboards (compact info density).

## Component Patterns

- Buttons: Primary (navy bg, white text, gold hover), Destructive (red), Ghost (border only, navy text)
- Status badges: Background colors matched to lead status (gold for active, gray for pending), rounded pill (full radius)
- Cards: 8px border-radius, 1px border, white background, 2px soft shadow
- Input fields: Border (light), navy focus ring, 8px radius, placeholder gray text
- Tables: Header row (secondary bg + navy text), alt rows (light secondary), hover (lighter secondary)

## Motion

- Entrance: Fade + 2px slide-down on load (200ms ease-out)
- Hover: Smooth color transition (150ms) on buttons, interactive elements. Subtle scale (1.02) on cards
- Feedback: Toast notifications slide from top-right (200ms), auto-dismiss after 4s

## Constraints

- No gradients; use solid OKLCH colors only
- No animations beyond entrance/hover/feedback choreography
- Tables must support both Mobile (compact cards) and Desktop (full table) views via toggle
- All dates display and store in DD/MMM/YYYY format exclusively
- PropFlow logo must appear in header on every authenticated page

## Signature Detail

Golden accent highlights on interactive CTAs and active status badges create immediate premium perception while maintaining professional clarity. The combination of deep navy authority + warm gold luxury is distinctly real estate (high-end properties) without cliché.

