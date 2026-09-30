import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-center',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './book-center.html',
  styleUrl: './book-center.css'
})
export class BookCenterComponent { }