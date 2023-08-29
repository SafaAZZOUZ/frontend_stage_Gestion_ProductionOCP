import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CamionService} from '../../../services/camion.service';
import {Camion} from '../../../model/Camion';

@Component({
  selector: 'app-add',
  templateUrl: './add-C.component.html',
  styleUrls: ['./add-C.component.scss']
})
export class AddCComponent {

  camion: Camion = {
    id: 0,
    marque: '',
    modele: ' ',
    consommationCarburant: 0,
    kilometrage: 0,
    dateMaintenance: new Date()
  };

  constructor(
    private camionService: CamionService,
    private router: Router
  ) {}

  onSubmit() {
    this.camionService.addCamion(this.camion).subscribe(() => {
      this.router.navigate(['/Camion']);
      window.location.reload();
    });
  }
}
