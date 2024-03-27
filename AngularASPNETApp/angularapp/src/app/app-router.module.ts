import { RouterModule, Routes } from '@angular/router';

// componet
import { ContactlistComponent } from './contactlist/contactlist.component';
import { NewcontactComponent } from './newcontact/newcontact.component';
import { Input, NgModule } from '@angular/core';

const routes: Routes = [
  { path: "contactlist", component: ContactlistComponent},
  { path: "newcontact", component: NewcontactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouterModule {

} 
