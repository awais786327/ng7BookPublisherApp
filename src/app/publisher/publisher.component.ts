import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  publisherForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.publisherForm = this.formBuilder.group({
      name: ['', Validators.required],
      about: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.publisherForm.invalid) {
      return;
    }

    this.success = true;
    this.saveDataToLocalStorage(this.publisherForm.value)
      .then(data => {
        console.log(data);
        this.toastr.success(`Publisher ${this.publisherForm.value.name} added successfully!`);
        this.publisherForm.reset();
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
      data = JSON.parse(localStorage.getItem('publisher')) || [];
      data.push(obj);
      localStorage.setItem('publisher', JSON.stringify(data));
      resolve(JSON.parse(localStorage.getItem('publisher')) || []);
    });
  }

}
