# Library-project

A responsive book library web application built with Angular and integrated with Firebase Cloud Firestore for persistent book data storage. The application is deployed to Firebase Hosting and provides browsing, viewing, adding, editing, and deleting books through a pixel-art inspired user interface.

## Live Demo

The application is deployed on Firebase Hosting:

https://library-403f2.web.app/

## About the Project

Library is a single-page web application designed as a digital book collection.

The application allows users to:

- browse a collection of books;
- view book information;
- open a detailed page for a selected book;
- add new books;
- edit existing books;
- delete books;
- work with persistent data stored in Cloud Firestore;
- use the application on both desktop and mobile devices.

The project combines a responsive interface with an interactive book visualization. On desktop devices, books visually open when the cursor is moved over them. On touch devices, the same interaction is adapted for tapping.

## Main Features

### Book Collection

The main page displays books as individual visual cards.

Each book contains:

- ID;
- name;
- author.

The application initially contains a collection of sample books and uses Firestore as the persistent data source.

### Book Details

Each book has a dedicated details page.

The details page displays:

- book title;
- book ID;
- author;
- an enlarged open-book illustration;
- navigation back to the collection;
- an option to edit the selected book.

### Add and Edit Forms

The application provides a reusable form for creating and editing books.

The form contains:

- book ID;
- book name;
- author.

Form validation prevents invalid or incomplete data from being submitted.

### Delete Functionality

Books can be deleted directly from the book collection interface.

The data is removed from Cloud Firestore, so the changes remain persistent after page reloads.

## Responsive Design

The application is adapted for both desktop and mobile screens.

### Desktop

On larger screens:

- books are displayed in a flexible grid;
- books visually open when hovered with the cursor;
- opening and closing animations use smooth transitions;
- book details are arranged horizontally;
- the opened book illustration is displayed on the left;
- book information is displayed on the right.

The hover animation also includes a short delay before opening and closing, preventing books from rapidly switching when the cursor moves across several books.

### Mobile

On screens up to 600px wide:

- four books are displayed in a row;
- book illustrations are reduced proportionally;
- text and controls are scaled for smaller screens;
- the book collection remains compact while preserving the visual style;
- tapping a book can trigger the same opening interaction before navigating to its details page;
- the details page changes to a vertical layout;
- the opened book is displayed above the information card.

The layout is implemented with CSS media queries and responsive sizing.

## Firebase Integration

The project uses Firebase as its backend infrastructure.

### Firebase Hosting

The Angular application is deployed using Firebase Hosting.

The production browser build is generated into:

```text
dist/lab2/browser
````

Firebase Hosting serves this directory as the public application.

### Cloud Firestore

The application uses Cloud Firestore as its NoSQL database.

The Firebase project contains a Firestore database with a book collection:

```text
list-books
```

The collection stores book documents with the following structure:

```text
id
name
author
```

Example:

```json
{
  "id": 1,
  "name": "Angular",
  "author": "Drozd"
}
```

Firestore provides persistent storage, so changes made through the application remain available after reloading the page.

## Firestore Service

Firestore access is encapsulated in a dedicated Angular service:

```text
src/app/services/firestore.service.ts
```

The service is responsible for communication between the Angular application and Cloud Firestore.

It provides methods for:

```text
getBooks()
getBook(id)
addBook(book)
updateBook(id, data)
deleteBook(id)
```

The service also contains functionality for adding the existing sample book collection to Firestore.

This approach separates database operations from UI components and keeps Firebase-specific logic in one place.

## Project Architecture

The application follows a component-based Angular architecture.

The main responsibilities are separated between:

```text
Components
    ↓
Services
    ↓
Firebase / Cloud Firestore
```

### Components

Components are responsible for displaying data and handling user interaction.

The main book-related components include:

```text
BookCenterComponent
BookListComponent
BookDetailsComponent
BookFormComponent
```

Their responsibilities are separated as follows:

* `BookCenterComponent` — main book section layout;
* `BookListComponent` — displays the collection of books;
* `BookDetailsComponent` — displays information about a selected book;
* `BookFormComponent` — creates and edits books.

### Routing

Angular Router is used for navigation between application views.

The main routes include:

```text
/
 /book/add
 /book/:id
 /book/edit/:id
```

The routes are grouped in the book-related routing module:

```text
src/app/Books/books.routes.ts
```

The root routing configuration is located in:

```text
src/app/app.routes.ts
```

This allows the application to behave as a single-page application while supporting separate URLs for different views.

## Data Model

Books are represented by a TypeScript interface.

The model contains:

```ts
interface Book {
  id: number;
  name: string;
  author: string;
}
```

Sample book data is maintained separately from the presentation layer and can be used for initial Firestore population and development.

## Project Structure

A simplified project structure looks like this:

```text
lab2/
├── src/
│   ├── app/
│   │   ├── Books/
│   │   │   ├── book.ts
│   │   │   ├── mock-book-list.ts
│   │   │   ├── books.routes.ts
│   │   │   ├── book-center/
│   │   │   ├── book-list/
│   │   │   ├── book-details/
│   │   │   └── book-form/
│   │   │
│   │   ├── services/
│   │   │   └── firestore.service.ts
│   │   │
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   └── index.html
│
├── public/
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── angular.json
├── package.json
└── README.md
```

## Technology Stack

The project uses:

* Angular 21
* TypeScript
* RxJS
* Angular Router
* Angular Forms
* Bootstrap
* Firebase
* Cloud Firestore
* Firebase Hosting
* Angular SSR

## Development Server

To run the application locally:

```bash
npm start
```

The application will be available at:

```text
http://localhost:4200/
```

Angular automatically rebuilds the application when source files are changed.

## Installing Dependencies

After cloning the repository, install the project dependencies:

```bash
npm install
```

Firebase CLI is included as a development dependency, so it can be executed with:

```bash
npx firebase
```

## Building the Project

To create a production build:

```bash
npm run build
```

The generated browser application is placed in:

```text
dist/lab2/browser
```

The server-side build is generated alongside the browser build because the project includes Angular SSR.

## Deploying to Firebase

To deploy the application to Firebase Hosting:

```bash
npm run build
npx firebase deploy --only hosting
```

The deployment uses the Firebase project:

```text
library-403f2
```

The public website is:

```text
https://library-403f2.web.app/
```

## Firebase Configuration

Firebase configuration is initialized in:

```text
src/app/app.config.ts
```

The application uses:

```ts
provideFirebaseApp()
provideFirestore()
```

to initialize Firebase and connect Angular to Cloud Firestore.

Firestore rules are stored in:

```text
firestore.rules
```

and Firestore indexes are configured in:

```text
firestore.indexes.json
```

## Database Structure

The Firestore database contains a collection named:

```text
list-books
```

Documents represent individual books.

Example structure:

```text
list-books
├── 1
│   ├── id
│   ├── name
│   └── author
├── 2
│   ├── id
│   ├── name
│   └── author
├── 3
│   ├── id
│   ├── name
│   └── author
└── ...
```

## User Interface

The interface uses a combination of:

* responsive CSS;
* transparent and blurred information cards;
* pixel-style controls;
* book sprite illustrations;
* hover and touch interactions;
* responsive grid layouts.

The visual design is intentionally based on a pixel-art book collection concept while keeping the application functional as a standard CRUD library.

## Testing

Unit tests can be executed with:

```bash
npm test
```

The project uses Vitest through the Angular testing configuration.

## Additional Angular Commands

Generate a new component:

```bash
ng generate component component-name
```

Generate a new service:

```bash
ng generate service service-name
```

Display available Angular CLI commands:

```bash
ng generate --help
```

## Project Goal

The main goal of the project is to demonstrate the development of a modern Angular application with:

* component-based architecture;
* client-side routing;
* responsive UI design;
* form handling and validation;
* CRUD operations;
* integration with a NoSQL database;
* Firebase deployment;
* responsive interaction patterns for desktop and mobile devices.

