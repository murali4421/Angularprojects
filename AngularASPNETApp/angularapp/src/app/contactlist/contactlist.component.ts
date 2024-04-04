import { Component, AfterViewInit, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Contact } from '../interface/Contact';
import { Sort } from '@angular/material/sort';
import { ContactlistService } from '../contactlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css'],
  //,
  //standalone: true,
  //imports: [MatTableModule,MatSortModule]

})
export class ContactlistComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'email','dob','gender','action']
  dataSource = new MatTableDataSource<Contact, MatPaginator>();
  tempDataSource = new MatTableDataSource<Contact, MatPaginator>();
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;
  fromdata: number | undefined;
  todate: number | undefined;
  searchText: string | undefined;

  constructor(private service: ContactlistService, private router: Router) {
    
  }

  ngAfterViewInit()
  {
    this.getContactList();
  }

  getContactList() {
    this.service.getAllContacts().subscribe(data => {
      this.dataSource = new MatTableDataSource<Contact, MatPaginator>(data as Contact[]);
      this.tempDataSource = this.dataSource;
      this.length = this.tempDataSource.data.length;
      this.pageSize = 5;
    });
  }

  handlePageEvent(e: PageEvent)
  {
    this.pageEvent = e;
    this.length = this.tempDataSource.data.length; // total record
    this.pageSize = e.pageSize; // per page records count
    this.pageIndex = e.pageIndex; // Page index

    if (this.pageIndex === 0)
    {
      this.fromdata = 0;
      this.todate = this.pageSize;
    }
    else
    {
      this.fromdata = this.pageSize * e.pageIndex;
      this.todate = this.pageSize * (e.pageIndex + 1);
    }

    this.dataSource = this.tempDataSource.data.slice(this.fromdata, this.todate) as unknown as MatTableDataSource<Contact, MatPaginator>;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  sortData(sort: Sort) {
    const data = this.tempDataSource.data;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) =>
    {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'phone':
          return compare(a.phone, b.phone, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource = this.dataSource.data.slice(0, 5) as unknown as MatTableDataSource<Contact, MatPaginator>
  }

  

  onEditContact(data: Contact) {
    this.service.setEditingDataSharing(data);
    this.router.navigate(['ContactUpdate'])
  }

  toggleSearch: boolean = false;

  onDeleteContact(id: number) {
    this.service.deleteEntry(id).subscribe(data => {
      if (data === 'Deleted') {
        this.getContactList();
      }
    });
  }

  onSearchContact() {
    if (this.searchText !== undefined && this.searchText !== '') {
      const data = this.tempDataSource.data.filter(x => {
        return x.name.toLowerCase().startsWith(this.searchText?.toLocaleLowerCase() as string); 
      }
      );

      this.length = data.length;
      this.dataSource = (data as unknown as MatTableDataSource<Contact, MatPaginator>);
    }
    else
    {
      this.length = this.tempDataSource.data.length;
      this.dataSource = this.tempDataSource as unknown as MatTableDataSource<Contact, MatPaginator>;
    }    
    return;
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
