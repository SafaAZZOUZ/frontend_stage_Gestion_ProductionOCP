import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalVoyages: number;
  totalConducteur: number;
  totalCamion: number;
  totalArret: number;
  totalDistance: number;
  cards: any;
  totalTravelTime$: Observable<string>;
  voyagesByDayChartData: any = [];
  roles!: string | null;
   userId: any;
  constructor(private dashboardService: DashboardService) {
  }
  ngOnInit() {
    this.dashboardService.getVoyagesCount().subscribe(
      (count) => {
        this.totalVoyages = count;
      },
      (error) => {
        console.error('Error fetching total voyages count:', error);
      }
    );
    this.dashboardService.getConducteursCount().subscribe(
      (count) => {
        this.totalConducteur = count;
      },
      (error) => {
        console.error('Error fetching total voyages count:', error);
      }
    );
    this.dashboardService.getCamionsCount().subscribe(
      (count) => {
        this.totalCamion = count;
      },
      (error) => {
        console.error('Error fetching total voyages count:', error);
      }
    );
    this.dashboardService.getArretCount().subscribe(
      (count) => {
        this.totalArret = count;
      },
      (error) => {
        console.error('Error fetching total voyages count:', error);
      }
    );
  }
}


