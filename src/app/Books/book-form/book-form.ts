import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, name: '', author: '' };
  isEditMode = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const existingBook = this.bookService.getBook(id);
      if (existingBook) {
        this.book = { ...existingBook }; 
        this.isEditMode = true;
      }
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book);
    } else {
      this.bookService.addBook(this.book);
    }
    this.router.navigate(['/']);
  }
}