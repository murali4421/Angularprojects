import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './interface/Contact';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ContactlistService {

  baseUrl: string = 'http://localhost:5228';
  contactList: string = this.baseUrl + '/ContactList';
  AddContact: string = this.baseUrl + '/AddContact';
  UpdateContact: string = this.baseUrl + '/UpdateContact';
  DeleteContact: string = this.baseUrl + '/DeleteContact';
  private contact!: any;

  constructor(private http: HttpClient) { }
  
  getAllContacts() {
    return this.http.get(this.contactList);
  };

  createEntry(entry: any) {
    return this.http.post(this.AddContact, entry);
  };

  updateEntry(entry: any) {
    return this.http.post(this.UpdateContact, entry);
  };

  deleteEntry(id: number) {
    return this.http.get(this.DeleteContact +'/?id='+ id);
  };

  setEditingDataSharing(data:any) {
    this.contact = data;
  }
  getDataSharing() {
    return this.contact;
  }
}
