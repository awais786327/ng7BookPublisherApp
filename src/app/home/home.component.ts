import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Object;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    // this.data.getUsers().subscribe(data => {
    //   this.users = data
    //   console.log(this.users);
    // });
    this.books = JSON.parse(localStorage.getItem('book') || '[]');
    console.info('books ', this.books);
  }

  redirectToBook() {
    this.router.navigate(['newBook']);
  }

}
