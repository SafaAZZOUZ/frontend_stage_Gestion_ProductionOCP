import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Conducteur} from '../../model/Conducteur';
import {Camion} from '../../model/Camion';
import {VoyageService} from '../../services/voyage.service';
import {Voyage} from '../../model/Voyage';


@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent {
  camions: Camion[];
  conducteurs: Conducteur[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { voyage: Voyage },
    private voyageService: VoyageService
  ) {
    this.loadCamionsAndConducteurs(data.voyage.id);
  }

  loadCamionsAndConducteurs(voyageId: number) {
    this.voyageService.getCamionsForVoyage(voyageId).subscribe(
      (camions: Camion[]) => {
        this.camions = camions;
      },
      error => {
        console.error('Erreur lors du chargement des camions :', error);
      }
    );

    this.voyageService.getConducteursForVoyage(voyageId).subscribe(
      (conducteurs: Conducteur[]) => {
        this.conducteurs = conducteurs;
      },
      error => {
        console.error('Erreur lors du chargement des conducteurs :', error);
      }
    );
  }
}
