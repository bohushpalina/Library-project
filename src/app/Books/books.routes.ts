import { Routes } from '@angular/router';

import { BookCenterComponent } from './book-center/book-center';
import { BookListComponent } from './book-list/book-list';
import { BookDetailsComponent } from './book-details/book-details';
import { BookFormComponent } from './book-form/book-form';

export const booksRoutes: Routes = [
  {
    path: '',
    component: BookCenterComponent,
    children: [
      { path: '', component: BookListComponent },
      { path: 'book/add', component: BookFormComponent },
      { path: 'book/edit/:id', component: BookFormComponent },
      { path: 'book/:id', component: BookDetailsComponent }
    ]
  }
];
