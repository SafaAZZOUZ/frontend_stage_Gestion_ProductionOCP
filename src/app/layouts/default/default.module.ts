import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { VoyageComponent } from 'src/app/modules/Voyage/Voyage.component';
import {CamionComponent} from 'src/app/modules/Camion/CamionComponent';
import {ConducteurComponent} from 'src/app/modules/Conducteur/ConducteurComponent';
import {QualiteComponent} from 'src/app/modules/Qualite/QualiteComponent';
import {ArretCamionComponent} from 'src/app/modules/ArretCamion/ArretCamionComponent';
import { EditComponent } from '../../modules/Voyage/edit/edit.component';
import {AddComponent} from 'src/app/modules/Voyage/add/add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatSidenavModule,
  MatDividerModule,
  MatCardModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/services/dashboard.service';
import {AddCamionComponent} from '../../modules/ArretCamion/add-Camion/add-Camion.component';
import {EditCamionComponent} from '../../modules/ArretCamion/edit-Camion/edit-Camion.component';
import {AddConducteurComponent} from '../../modules/Conducteur/add-Conducteur/add-Conducteur.component';
import {EditQualiteComponent} from '../../modules/Qualite/edit-Qualite/edit-Qualite.component';
import {AddQualiteComponent} from '../../modules/Qualite/add-Qualite/add-Qualite.component';
import {AddCComponent} from '../../modules/Camion/add-C/add-C.component';
import {EditCComponent} from '../../modules/Camion/edit-C/edit-C.component';
import {EditConducteurComponent} from '../../modules/Conducteur/edit-Conducteur/edit-Conducteur.component';
import {DetailsDialogComponent} from '../../modules/details-dialog/details-dialog.component';
import {LoginComponent} from '../../modules/login/login.component';
import {RegisterComponent} from '../../modules/register/register.component';
import {AccountManagementComponent} from '../../modules/account-management/account-management.component';
import {AddUserComponent} from '../../modules/account-management/add-User/add-User.component';
import {EditUserComponent} from '../../modules/account-management/edit-User/edit-User.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    VoyageComponent,
    EditComponent,
    CamionComponent,
    ConducteurComponent,
    QualiteComponent,
    ArretCamionComponent,
    AddComponent,
    AddCamionComponent,
    EditCamionComponent,
    AddConducteurComponent,
    EditQualiteComponent,
    AddQualiteComponent,
    AddCComponent,
    EditCComponent,
    EditConducteurComponent,
    DetailsDialogComponent,
    LoginComponent,
    RegisterComponent,
    AccountManagementComponent,
    AddUserComponent,
    EditUserComponent
  ],
    imports: [
        CommonModule,
        RouterModule, // Assurez-vous d'avoir configuré correctement les routes ici
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatNativeDateModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatOptionModule,

    ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
