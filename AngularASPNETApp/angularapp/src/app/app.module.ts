import { HttpClientModule } from '@angular/common/http';
import {
  Input, NgModule, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

// Components
import { AppComponent } from './app.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { NewcontactComponent } from './newcontact/newcontact.component';

// service
import { ContactlistService } from './contactlist.service';

// Routers
import { AppRouterModule } from './app-router.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OnlyNumberDirective } from './CommonLib/only-number';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    ContactlistComponent,
    NewcontactComponent,
    FooterComponent,
    OnlyNumberDirective
  ],
  imports: [MatProgressSpinnerModule,
    // Routers
    AppRouterModule, MatIconModule,
    BrowserAnimationsModule, FormsModule,

    BrowserModule,
    HttpClientModule,
    MatCardModule, MatSortModule, MatPaginatorModule, 
    MatTableModule, MatToolbarModule, 
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,

    MatMenuModule, MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
      
  ],
  providers: [ContactlistService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    this.router.navigate(['AddContact']);
  }
}
