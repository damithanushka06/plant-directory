# Plant Directory

This is a simple Angular application that fetches and displays a list of plants from a remote API. Users can view a summary of each plant on the main page and click on a plant tile to view detailed information. It showcases clean component design, responsive styling, and API integration.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version **19.2.12**.

---

## Project Setup

Install dependencies using npm:

```bash
npm install
```

---

## Development Server

Start the local development server:

```bash
ng serve
```

Once running, open your browser and navigate to:

```
http://localhost:4200/
```

The application will automatically reload when you modify source files.

---

## API Endpoints

This project consumes data from a live backend service:

- **Get Plant List**:  
  `https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev`

- **Get Plant Details by ID**:  
  `https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev/{id}`  
  (Example: `/dev/1` for Plant ID 1)

---

## Code Scaffolding

Generate new Angular elements using Angular CLI:

```bash
ng generate component component-name
```

For other schematics like directives or pipes:

```bash
ng generate --help
```

---

## Building the Project

To compile and build the production-ready application:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory. The default build includes optimizations for production.

---

## Running Unit Tests

To execute unit tests using the [Karma](https://karma-runner.github.io) test runner:

```bash
ng test
```

Tested Modules

PlantService (plant.service.spec.ts)

1. Tests getPlants():

2. Verifies API call and response transformation.

3. Tests getPlantById(id):

4. Fetches individual plant details by ID.

Uses HttpClientTestingModule to mock HTTP requests.

PlantDetailComponent (plant-detail.component.spec.ts)

1. Calls loadPlant() on ngOnInit().

2. Mocks route parameters using ActivatedRoute.

Verifies:

1. Successful API response.

2. Error handling behavior.

3. Edge case: Invalid id (no API call made).

4. Tests goBack() navigation using mock Router.

PlantListComponent (plant-list.component.spec.ts)

1. Fetches plant list on component load.

2. Tests pagination behavior with mocked API responses.

3. Handles loading and error states.

Testing Tools & Modules

1. HttpClientTestingModule for HTTP request mocking.

2. ActivatedRoute mock via convertToParamMap().

3. Jasmine spies (jasmine.createSpyObj) for services and router.

4. RxJS of() and throwError() for mocking asynchronous responses.

---

## Features

- **Plant List View**: Displays a responsive grid of plant tiles showing name, division, country, and address.
- **Details View**: Clicking on a plant navigates to a route that loads detailed data using the plant ID.
- **Routing**: Client-side routing with dynamic paths powered by Angular Router.
- **Responsive Layout**: Adapts layout based on device width using CSS Grid and media queries.
- **Clean Component Styling**: SCSS modules used to encapsulate styles.
- **Live API Integration**: Fetches data from a remote API using `HttpClient`.

---

## Enhancements & Improvements

1. Enhancement Details:

Component: PlantListComponent

File: plant-list.component.scss

Change:

Added a hover effect to .plant-card class

Uses a subtle background color (#f9f9f9) and elevated shadow to highlight card interactivity

Added a smooth transition for hover states

2. Optimized `*ngFor` rendering in `PlantListComponent` using `trackByPlantId` to minimize DOM updates and improve performance:

  ```html
  *ngFor="let plant of plants; trackBy: trackByPlantId"
  ```

3. Verifies that the button displays "Loading..." text while a request is in progress:
   {{ loading ? 'Loading...' : 'Load More Results' }}
   Adds a test to assert the correct label appears during the loading state after clicking the Load More Results button.

4.
  - **Plant Detail Loading Template**  
    Displays a loading message while plant details are being fetched using Angular’s `ng-template`:


5.
  - **Plant List Loading Template**
    Displays a loading message while the plant list is being fetched using Angular’s ng-template:

6. Plant List : Subscription Cleanup on Component Destroy:**
   Ensures the plantsSub subscription is properly unsubscribed in ngOnDestroy() to prevent memory leaks when navigating away (e.g., going to plant detail view)

7. Safe Observable Cleanup in PlantDetailComponent:
   Used takeUntil and ngOnDestroy() to automatically unsubscribe from the HTTP observable when the component is destroyed. Prevents memory leaks and improves maintainability.

8. SCSS Architecture Enhancement
   Added a centralized SCSS variables file (_variables.scss) to manage design tokens such as colors, border-radius, and spacing consistently across the project.

   Introduced a common global stylesheet to maintain shared styles and reduce duplication across components.

   Benefits:

   Improves maintainability and consistency in UI styling.

   Makes it easier to update themes or branding in one place.

9. Added animation to .loading-container using fadeInScale to enhance user interaction and improve visual feedback during loading states.

10. Custom Scrollbar Styling : Added a reusable SCSS mixin custom-scrollbar to style scrollbars consistently across the project.

11. Concurrent Request Handling: When the "Load More Results" button is clicked, the method immediately returns if a loading operation is already in progress.
    This prevents multiple concurrent API requests and ensures efficient data loading.

12. Performance Optimization with OnPush Strategy: ChangeDetectionStrategy.OnPush is applied to PlantListComponent & PlantDetailComponent to optimize performance. 
   This ensures change detection only runs when necessary, reducing unnecessary DOM checks and improving app efficiency.

---

## Future Enhancements

If further developed, the following features could be added:

- **Search & Filter**: Allow filtering of plants by name, country, or division.
- **Error States**: Display error messages on API failure or invalid routes.
- **Accessibility (a11y)**: Improve keyboard support and add ARIA attributes.
- **Internationalization (i18n)**: Support multiple languages.

---

## 🔧 Angular & Tooling Versions

Project dependencies include:

```json
{
  "@angular/core": "^19.2.0",
  "@angular/cli": "^19.2.12",
  "rxjs": "~7.8.0",
  "zone.js": "~0.15.0",
  "typescript": "~5.7.2",
  "karma": "~6.4.0",
  "jasmine-core": "~5.6.0"
}
```

Refer to `package.json` for the full list of dev and runtime dependencies.

---

## 📚 Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Official Docs](https://angular.dev/)
- [RxJS Docs](https://rxjs.dev/guide/overview)
- [Karma Testing Framework](https://karma-runner.github.io)

---

## 👤 Author

**Damith Anushka**

---
