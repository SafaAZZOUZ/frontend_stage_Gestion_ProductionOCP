import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {QualiteService} from '../../../services/qualite.service';
import {Qualite} from '../../../model/Qualite';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-Qualite.component.html',
  styleUrls: ['./edit-Qualite.component.scss']
})
export class EditQualiteComponent implements OnInit {
  updateFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private qualiteService: QualiteService
  ) {}

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      tauxSatisfaction: this.fb.control(null, [Validators.required]),
      tauxDefauts: this.fb.control(null, [Validators.required]),
      dateEvaluation: this.fb.control(null, [Validators.required]),
      commentaires: this.fb.control(null, [Validators.required])
    });
    this.getVoyage();
  }

  getVoyage() {
    const id = this.route.snapshot.params['id']; // Utilisation de ['id'] plutôt que [`id`]
    if (!isNaN(id)) {
      this.qualiteService.getQualiteById(id).subscribe(
        {
          next: data => {
            this.updateFormGroup.patchValue({
              tauxSatisfaction: data.tauxSatisfaction,
              tauxDefauts: data.tauxDefauts,
              dateEvaluation: data.dateEvaluation,
              commentaires: data.commentaires
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
      const updated: Qualite = this.updateFormGroup.value;
      updated.id = +this.route.snapshot.params['id'];

      if (!isNaN(updated.id)) {
        this.qualiteService.updateQualite(updated.id , updated).subscribe(
          {
            next: data => {
              Swal.fire({
                position: 'center',
                title: 'Successfully updated!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/Qualite']); // Rediriger après la mise à jour réussie
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
  }
}
