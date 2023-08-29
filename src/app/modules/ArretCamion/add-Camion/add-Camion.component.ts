import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArretCamion } from '../../../model/ArretCamion';
import { ArretService } from '../../../services/arret.service';
import { Camion } from '../../../model/Camion';

@Component({
  selector: 'app-add',
  templateUrl: './add-Camion.component.html',
  styleUrls: ['./add-Camion.component.scss']
})
export class AddCamionComponent {
  arret: ArretCamion = {
    id: 0,
    cause: '',
    dateHeure: new Date(),
    duree: '',
    camion: [],
    camionsDisponibles: [] // Initialisez avec une liste vide
  };

  constructor(
    private arretService: ArretService,
    private router: Router
  ) {
    // Récupérer la liste des camions disponibles
    this.arretService.getAllCamions().subscribe(camions => {
      this.arret.camionsDisponibles = camions;
    });
  }

  onSubmit() {
    this.arretService.addArret(this.arret).subscribe(() => {
      this.router.navigate(['/Arret']);
    });
  }
}
