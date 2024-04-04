import { RouterModule, Routes } from '@angular/router';

// componet
import { ContactlistComponent } from './contactlist/contactlist.component';
import { NewcontactComponent } from './newcontact/newcontact.component';
import { Input, NgModule } from '@angular/core';
import { userComponent } from './user/user.component';

const routes: Routes = [
  { path: "Contacts", component: ContactlistComponent},
  { path: "AddContact", component: NewcontactComponent },
  { path: "ContactUpdate", component: NewcontactComponent },
  { path: "Login", component: userComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouterModule {

} 
