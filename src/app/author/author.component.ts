import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authorForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      about: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.authorForm.invalid) {
      return;
    }

    this.success = true;
    this.saveDataToLocalStorage(this.authorForm.value)
      .then(data => {
        console.log(data);
        this.toastr.success(`Author ${this.authorForm.value.name} added successfully!`);
        this.authorForm.reset();
        this.resetFormFields();
        setTimeout(() => {
          this.router.navigate(['newBook']);
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
      data = JSON.parse(localStorage.getItem('author')) || [];
      data.push(obj);
      localStorage.setItem('author', JSON.stringify(data));
      resolve(JSON.parse(localStorage.getItem('author')) || []);
    });
  }

}
