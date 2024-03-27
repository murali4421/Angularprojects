import { Component, AfterViewInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactlistService } from '../contactlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnlyNumberDirective } from '../CommonLib/only-number';

import { Contact } from '../interface/Contact';
import { Router } from '@angular/router';
import { ContactlistComponent } from '../contactlist/contactlist.component';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.css']
})

export class NewcontactComponent implements AfterViewInit{

  maxid: number | undefined;
  submitResult: string | undefined;
  editData!: Contact;
  
  dataSource = new MatTableDataSource<Contact>;
  newContact = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(12), Validators.pattern(("^[0-9]*$"))]),
    email: new FormControl('', [Validators.email])
  });

  emailFormControl = this.newContact.controls.email;
  phoneFormControl = this.newContact.controls.phone;
  formValid = this.newContact;
  submitButtonName!: string | 'Add';
  lblTitle!: string | 'New Contact';

  constructor(private service: ContactlistService, private router: Router) {
    this.editData = this.service.getDataSharing();
    this.submitButtonName = 'Add';
    this.lblTitle = "New Contact";

    if (this.editData != undefined) {
      this.newContact.controls.id.setValue(this.editData.id);
      this.newContact.controls.name.setValue(this.editData.name);
      this.newContact.controls.phone.setValue(this.editData.phone.toString());
      this.newContact.controls.email.setValue(this.editData.email);
      this.submitButtonName = 'Update';
      this.lblTitle = "Update Contact";
      this.service.setEditingDataSharing(undefined);
    }
  }
  
  ngAfterViewInit() {
    this.service.getAllContacts().subscribe(data => {
      this.dataSource = new MatTableDataSource<Contact>(data as Contact[]);
    });

    this.maxid = 1;
    if (this.dataSource.data.length > 0) {
      this.maxid = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    }

  }  
  
  onSubmit() {

    if (this.newContact.value.name === "") {
      return;
    }
    if (this.newContact.value.email === "") {
      return;
    }
    if (this.newContact.value.phone === "") {
      return;
    }

    if (this.submitButtonName === 'Add') {

      this.service.getAllContacts().subscribe(data => {
        this.dataSource = new MatTableDataSource<Contact>(data as Contact[]);
      });

      this.maxid = 1;
      if (this.dataSource.data.length > 0) {
        this.maxid = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
      }

      this.newContact.value.id = this.maxid;
      this.service.createEntry(this.newContact.value as unknown as Contact).subscribe(
        data => {
          if (data.toString() === 'Created') {
            this.submitResult = 'Created';
            this.router.navigate(['contactlist']);
          } else {
            this.submitResult = 'error';
          }
        }, error => this.submitResult = 'error'
      );
    }
    else {
      this.service.updateEntry(this.newContact.value as unknown as Contact).subscribe(data => {

        if (data.toString() === 'Updated') {
          this.submitResult = 'Updated';
          this.router.navigate(['contactlist']);
        } else {
          this.submitResult = 'error';
        }
      }, error => this.submitResult = 'error'
      );
    }
  }  
}
