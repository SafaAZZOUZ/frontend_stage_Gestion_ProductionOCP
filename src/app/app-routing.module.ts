import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VoyageComponent } from './modules/Voyage/Voyage.component';
import { EditComponent } from './modules/Voyage/edit/edit.component';
import { CamionComponent } from './modules/Camion/CamionComponent';
import { ConducteurComponent } from './modules/Conducteur/ConducteurComponent';
import { ArretCamionComponent } from './modules/ArretCamion/ArretCamionComponent';
import { QualiteComponent } from './modules/Qualite/QualiteComponent';
import { AddComponent } from './modules/Voyage/add/add.component';
import { AddCComponent } from './modules/Camion/add-C/add-C.component';
import { EditCComponent } from './modules/Camion/edit-C/edit-C.component';
import { AddCamionComponent } from './modules/ArretCamion/add-Camion/add-Camion.component';
import { EditCamionComponent } from './modules/ArretCamion/edit-Camion/edit-Camion.component';
import { AddConducteurComponent } from './modules/Conducteur/add-Conducteur/add-Conducteur.component';
import { EditConducteurComponent } from './modules/Conducteur/edit-Conducteur/edit-Conducteur.component';
import { AddQualiteComponent } from './modules/Qualite/add-Qualite/add-Qualite.component';
import { EditQualiteComponent } from './modules/Qualite/edit-Qualite/edit-Qualite.component';
import { DetailsDialogComponent } from './modules/details-dialog/details-dialog.component';
import { MainGuard } from './modules/guards/main-guard.service';
import {LoginComponent} from './modules/login/login.component';
import {RegisterComponent} from './modules/register/register.component';
import {AccountManagementComponent} from './modules/account-management/account-management.component';
import {AddUserComponent} from './modules/account-management/add-User/add-User.component';
import {EditUserComponent} from './modules/account-management/edit-User/edit-User.component';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: DefaultComponent, canActivate: [MainGuard], canLoad: [MainGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
      { path: 'Voyage', component: VoyageComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
      { path: 'Camion', component: CamionComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
      { path: 'Conducteur', component: ConducteurComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
      { path: 'Qualite', component: QualiteComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
      { path: 'Arret', component: ArretCamionComponent, canActivate: [MainGuard], canLoad: [MainGuard] },
      { path: 'Voyage/edit/:id', component: EditComponent },
      { path: 'Voyage/add', component: AddComponent },
      { path: 'Camion/add-C', component: AddCComponent },
      { path: 'Camion/edit-C/:id', component: EditCComponent },
      { path: 'Arret/add-Camion', component: AddCamionComponent },
      { path: 'Arret/edit-Camion/:id', component: EditCamionComponent },
      { path: 'Conducteur/add-Conducteur', component: AddConducteurComponent },
      { path: 'Conducteur/edit-Conducteur/:id', component: EditConducteurComponent },
      { path: 'Qualite/add-Qualite', component: AddQualiteComponent },
      { path: 'Qualite/edit-Qualite/:id', component: EditQualiteComponent },
      { path: 'DetailsDialogComponent', component: DetailsDialogComponent },
      {path: 'AccountManagement', component: AccountManagementComponent},
      { path: 'AccountManagement/add-User', component: AddUserComponent },
      { path: 'AccountManagement/edit-User/:id', component: EditUserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
