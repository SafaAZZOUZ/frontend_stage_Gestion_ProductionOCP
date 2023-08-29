import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoyageService } from 'src/app/services/voyage.service';
import { Voyage } from 'src/app/model/Voyage';
import Swal from 'sweetalert2';
import {Conducteur} from '../../../model/Conducteur';
import {Camion} from '../../../model/Camion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
// ... (imports restants)

export class EditComponent implements OnInit {
  updateFormGroup: FormGroup;
  camions: Camion[] = [];
  conducteurs: Conducteur[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private voyageService: VoyageService
  ) {}

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      itineraire: this.fb.control(null, [Validators.required]),
      dateDepart: this.fb.control(null, [Validators.required]),
      dateArrivee: this.fb.control(null, [Validators.required]),
      camions: this.fb.control([]),
      conducteurs: this.fb.control([]),
    });
    this.loadCamionsAndConducteurs();
    this.getVoyage();
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

  getVoyage() {
    const id = this.route.snapshot.params['id']; // Utilisation de ['id'] plutôt que [`id`]
    if (!isNaN(id)) {
      this.voyageService.getVoyageById(id).subscribe(
        {
          next: data => {
            this.updateFormGroup.patchValue({
              itineraire: data.itineraire,
              dateDepart: data.dateDepart,
              dateArrivee: data.dateArrivee,
              camions: data.camions, // Ajout des camions et conducteurs existants
              conducteurs: data.conducteurs,
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
      const updatedVoyage: Voyage = this.updateFormGroup.value;
      updatedVoyage.id = +this.route.snapshot.params['id'];

      if (!isNaN(updatedVoyage.id)) {
        this.voyageService.updateVoyage(updatedVoyage.id, updatedVoyage).subscribe(
          {
            next: data => {
              Swal.fire({
                position: 'center',
                title: 'Successfully updated!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/Voyage']); // Rediriger après la mise à jour réussie
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
