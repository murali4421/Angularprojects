import {
  Component, AfterViewInit, Input, ViewChild, EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef,  
  Inject,
  OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactlistService } from '../contactlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnlyNumberDirective } from '../CommonLib/only-number';

import { Contact } from '../interface/Contact';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector:  'app-newcontact',
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
    email: new FormControl('', [Validators.email]),
    dob: new FormControl(),
    gender: new FormControl('')
  });

  emailFormControl = this.newContact.controls.email;
  phoneFormControl = this.newContact.controls.phone;
  formValid = this.newContact;
  submitButtonName!: string | 'Add';
  lblTitle!: string | 'Add Contact';

  myFilter = (d: Date | null): boolean => {
    //const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return true; //day !== 0 && day !== 6;
  };
    pipe: any;

  constructor(private service: ContactlistService, private router: Router) {
    this.preRenderData();
  }

  preRenderData() {
    this.editData = this.service.getDataSharing();
    this.submitButtonName = 'Add';
    this.lblTitle = "Add Contact";
    
    if (this.editData != undefined) {
      this.newContact.controls.id.setValue(this.editData.id);
      this.newContact.controls.name.setValue(this.editData.name);
      this.newContact.controls.phone.setValue(this.editData.phone.toString());
      this.newContact.controls.email.setValue(this.editData.email);

      this.newContact.controls.dob.setValue(new Date(this.editData.dob));
      this.newContact.controls.gender.setValue(this.editData.gender);
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

    //if (this.newContact.value.name === "") {
    //  return;
    //}
    //if (this.newContact.value.email === "") {
    //  return;
    //}
    //if (this.newContact.value.phone === "") {
    //  return;
    //}

    if (this.newContact.value.dob != undefined && this.newContact.value.dob !='') {
      this.newContact.value.dob = formatDate(this.newContact.value.dob, 'MM/dd/yyyy', 'en-US')
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
            this.router.navigate(['Contacts']);
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
          this.router.navigate(['Contacts']);
        } else {
          this.submitResult = 'error';
        }
      }, error => this.submitResult = 'error'
      );
    }
  }  
}

