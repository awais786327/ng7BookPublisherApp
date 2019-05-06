import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookForm: FormGroup;
  submitted = false;
  success = false;
  authors: any;
  publishers: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authors = JSON.parse(localStorage.getItem('author') || '[]');
    console.info('authors ', this.authors);
    this.publishers = JSON.parse(localStorage.getItem('publisher') || '[]');
    console.info('publishers ', this.publishers);
  }

  onSubmit() {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.success = true;
    this.saveDataToLocalStorage(this.bookForm.value)
      .then(data => {
        console.log(data);
        this.toastr.success(`Book ${this.bookForm.value.name} added successfully!`);
        this.bookForm.reset();
        this.resetFormFields();
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  }
  resetFormFields() {
    this.submitted = false;
    this.success = false;
  }
  saveDataToLocalStorage(obj) {
    return new Promise((resolve, reject) => {
      let data = [];
      data = JSON.parse(localStorage.getItem('book')) || [];
      data.push(obj);
      localStorage.setItem('book', JSON.stringify(data));
      resolve(JSON.parse(localStorage.getItem('book')) || []);
    });
  }

}
