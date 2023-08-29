import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Qualite} from '../../../model/Qualite';
import {QualiteService} from '../../../services/qualite.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-Qualite.component.html',
  styleUrls: ['./add-Qualite.component.scss']
})
export class AddQualiteComponent {

  qualite: Qualite = {
    id: 0,
    tauxSatisfaction : 0,
    tauxDefauts : 0,
    dateEvaluation: new Date(),
    commentaires: ''
  };

  constructor(
    private qualiteService: QualiteService,
    private router: Router
  ) {}

  onSubmit() {
    this.qualiteService.addQualite(this.qualite).subscribe(() => {
      this.router.navigate(['/Qualite']);
      window.location.reload();
    });
  }
}
