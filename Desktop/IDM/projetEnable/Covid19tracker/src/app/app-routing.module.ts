import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { PaysComponent } from './components/pays/pays.component';


const routes: Routes = [
  {path : '', component : AcceuilComponent},
  {path : 'pays', component : PaysComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
