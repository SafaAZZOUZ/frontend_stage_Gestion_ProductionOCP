import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ArretService } from '../../../services/arret.service';
import { ArretCamion } from '../../../model/ArretCamion';
import { Camion } from '../../../model/Camion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-Camion.component.html',
  styleUrls: ['./edit-Camion.component.scss']
})
export class EditCamionComponent implements OnInit {
  updateFormGroup: FormGroup;
  camions: Camion[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private arretService: ArretService
  ) {}

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      dateHeure: [null, Validators.required],
      cause: [null, Validators.required],
      duree: [null, Validators.required],
      camions: [null, Validators.required]
    });
    this.getArretAndCamions();
    this.loadCamionsAndConducteurs();
  }

  getArretAndCamions() {
    const id = this.route.snapshot.params['id'];
    if (!isNaN(id)) {
      this.arretService.getArretById(id).subscribe(
        {
          next: data => {
            this.updateFormGroup.patchValue({
              dateHeure: data.dateHeure,
              cause: data.cause,
              duree: data.duree,
              camions: [data.camion] // Mettez le camion dans un tableau pour le mat-select
            });

            // Charger la liste des camions disponibles
            this.arretService.getAllCamions().subscribe(
              camions => {
                this.camions = camions;
              },
              error => {
                // Gérer l'erreur si la récupération des camions échoue
              }
            );
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

  loadCamionsAndConducteurs() {
    this.arretService.getAllCamions().subscribe(
      (camions: Camion[]) => {
        this.camions = camions;
      },
      error => {
        console.error('Erreur lors du chargement des camions :', error);
      }
    );
  }

  onSubmit() {
    if (this.updateFormGroup.valid) {
      const updated: ArretCamion = this.updateFormGroup.value;
      updated.id = +this.route.snapshot.params['id'];

      if (!isNaN(updated.id)) {
        this.arretService.updateArret(updated.id, updated).subscribe(
          {
            next: data => {
              Swal.fire({
                position: 'center',
                title: 'Successfully updated!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/Arret']); // Rediriger après la mise à jour réussie
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
