import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ConducteurService} from '../../../services/conducteur.service';
import {Conducteur} from '../../../model/Conducteur';

@Component({
  selector: 'app-add',
  templateUrl: './add-Conducteur.component.html',
  styleUrls: ['./add-Conducteur.component.scss']
})
export class AddConducteurComponent {
  conducteur: Conducteur = {
    id: 0,
    nom: '',
    prenom : '',
    dateEm: new Date(),
    consommationCarburant: 0,
    vitesseMoyenne: 0
  };

  constructor(
    private conducteurService: ConducteurService,
    private router: Router
  ) {}

  onSubmit() {
    this.conducteurService.addConducteur(this.conducteur).subscribe(() => {
      this.router.navigate(['/Conducteur']);
      window.location.reload();
    });
  }
}

