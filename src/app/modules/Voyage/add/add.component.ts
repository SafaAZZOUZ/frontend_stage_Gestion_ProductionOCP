import { Component, OnInit } from '@angular/core';
import { VoyageService } from 'src/app/services/voyage.service';
import { Voyage } from 'src/app/model/Voyage';
import { Router } from '@angular/router';
import { Camion } from 'src/app/model/Camion';
import { Conducteur } from 'src/app/model/Conducteur';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  voyage: Voyage = {
    id: 0,
    itineraire: '',
    dateDepart: new Date(),
    dateArrivee: new Date(),
    camions: [],
    conducteurs: [],
    averageDuration: 0,
  };

  camions: Camion[] = [];
  conducteurs: Conducteur[] = [];

  constructor(
    private voyageService: VoyageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCamionsAndConducteurs();
  }

  loadCamionsAndConducteurs() {
    this.voyageService.getAllCamions().subscribe(
      (camions: Camion[]) => {
        this.camions = camions;
      },
      error => {
        console.error('Erreur lors du chargement des camions :', error);
      }
    );

    this.voyageService.getAllConducteurs().subscribe(
      (conducteurs: Conducteur[]) => {
        this.conducteurs = conducteurs;
      },
      error => {
        console.error('Erreur lors du chargement des conducteurs :', error);
      }
    );
  }

  onSubmit() {
    this.voyageService.addVoyage(this.voyage).subscribe(() => {
      this.router.navigate(['/Voyage']);
      window.location.reload();
    });
  }
}
