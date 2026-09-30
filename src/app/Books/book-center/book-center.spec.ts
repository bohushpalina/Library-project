import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCenter } from './book-center';

describe('BookCenter', () => {
  let component: BookCenter;
  let fixture: ComponentFixture<BookCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCenter],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
