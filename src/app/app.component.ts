import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './modules/Voyage/edit/edit.component';
import { ChartService } from './services/chart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  chartData: any[];

  constructor(private dialog: MatDialog, private chartDataService: ChartService) {
  }

  ngOnInit(): void {
  }

  openEditForm() {
    this.dialog.open(EditComponent);
  }
}
