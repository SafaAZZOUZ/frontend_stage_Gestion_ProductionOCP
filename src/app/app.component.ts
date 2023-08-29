import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditComponent} from './modules/Voyage/edit/edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  constructor(private  dialog: MatDialog) {}
  openEditForm() {
    this.dialog.open(EditComponent);
  }
}

