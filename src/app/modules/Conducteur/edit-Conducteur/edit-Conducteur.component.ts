import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {ConducteurService} from '../../../services/conducteur.service';
import {Conducteur} from '../../../model/Conducteur';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-Conducteur.component.html',
  styleUrls: ['./edit-Conducteur.component.scss']
})
export class EditConducteurComponent implements OnInit {
  updateFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private conducteurService: ConducteurService
  ) {}

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      nom : this.fb.control(null, [Validators.required]),
      prenom : this.fb.control(null, [Validators.required]),
      dateEm : this.fb.control(null, [Validators.required]),
      consommationCarburant: this.fb.control(null, [Validators.required]),
      vitesseMoyenne: this.fb.control(null, [Validators.required])
    });
    this.getConducteur();
  }

  getConducteur() {
    const id = this.route.snapshot.params['id'];
    if (!isNaN(id)) {
      this.conducteurService.getConducteurById(id).subscribe(
        {
          next: data => {
            this.updateFormGroup.patchValue({
              nom: data.nom,
              prenom: data.prenom,
              dateEm: data.dateEm,
              consommationCarburant: data.consommationCarburant,
              vitesseMoyenne: data.vitesseMoyenne
            });
          },
          error: err => {
            // Gérer l'erreur
          }
        }
      );
    } else {
      // Gérer le cas où l'ID n'est pas un nombre valide
    }
  }

  onSubmit() {
    if (this.updateFormGroup.valid) {
      const updated: Conducteur = this.updateFormGroup.value;
      updated.id = +this.route.snapshot.params['id'];

      if (!isNaN(updated.id)) {
        this.conducteurService.updateConducteur(updated.id , updated).subscribe(
          {
            next: data => {
              Swal.fire({
                position: 'center',
                title: 'Successfully updated!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/Conducteur']); // Rediriger après la mise à jour réussie
            },
            error: err => {
              // Gérer l'erreur
            }
          }
        );
      } else {
      }
    }
  }
}
