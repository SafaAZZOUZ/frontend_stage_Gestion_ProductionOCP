import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CamionService } from '../../../services/camion.service';
import { Camion } from '../../../model/Camion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-C.component.html',
  styleUrls: ['./edit-C.component.scss']
})
export class EditCComponent implements OnInit {
  updateFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private camionService: CamionService
  ) {}

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      marque: this.fb.control(null, [Validators.required]),
      modele: this.fb.control(null, [Validators.required]),
      consommationCarburant: this.fb.control(null, [Validators.required]),
      kilometrage: this.fb.control(null, [Validators.required]),
      dateMaintenance: this.fb.control(null, [Validators.required])
    });
    this.getCamion();
  }

  getCamion() {
    const id = this.route.snapshot.params['id'];
    if (!isNaN(id)) {
      this.camionService.getCamionById(id).subscribe(
        {
          next: data => {
            this.updateFormGroup.patchValue({
              marque: data.marque,
              modele: data.modele,
              consommationCarburant: data.consommationCarburant,
              kilometrage: data.kilometrage,
              dateMaintenance: data.dateMaintenance
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
      const updated: Camion = this.updateFormGroup.value;
      updated.id = +this.route.snapshot.params['id'];

      if (!isNaN(updated.id)) {
        this.camionService.updateCamion(updated.id , updated).subscribe(
          {
            next: data => {
              Swal.fire({
                position: 'center',
                title: 'Successfully updated!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/Camion']);
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
