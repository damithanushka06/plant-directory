# Plant Directory

An Angular application that displays a list of plants retrieved from a REST API with full detail views, responsive layout, and pagination. Built for desktop, tablet, and mobile breakpoints with a clean SCSS-based design.

---

## Live Features

- Paginated plant listing (10 per page)
- "More Results" button to fetch more data from API
- Clickable cards open plant detail pages
- Responsive layout:
  - **Desktop (≥1025px):** 5 cards per row
  - **Tablet (768px - 1024px):** 2 cards per row
  - **Mobile (320px - 767px):** 1 card per row
- Details layout: 2 columns (tablet/desktop), 1 column (mobile)
- Reusable SCSS with color variables
- Angular routing enabled

---

## Tech Stack

- Angular 19
- TypeScript
- SCSS (with variables)
- RxJS (for API handling)
- Angular CLI
- Responsive CSS (Flex/Grid)

---

## API Reference

- **List endpoint:**  
  `https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev`  
  Returns 10 plants and a `next` token.

- **Paginated results:**  
  Use the `next` token returned in the previous call:  
  `https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev/<next-token>`

- **Details endpoint:**  
  `https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev/{plantId}/`

---

