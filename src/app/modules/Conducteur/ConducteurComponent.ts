import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Conducteur} from '../../model/Conducteur';
import {ConducteurService} from '../../services/conducteur.service';
import {AddConducteurComponent} from './add-Conducteur/add-Conducteur.component';

@Component({
  selector: 'app-posts',
  templateUrl: './ConducteurComponent.html',
  styleUrls: ['./ConducteurComponent.scss']
})
export class ConducteurComponent implements OnInit {
  conducteur: Conducteur[] = [];
  dataSource: MatTableDataSource<Conducteur>;
  columns: string[] = ['id', 'nom', 'prenom', 'dateEm', 'details', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private conducteurService: ConducteurService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Conducteur>(this.conducteur);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getConducteur();
  }

  getConducteur() {
    this.conducteurService.getAllConducteurs().subscribe(
      (data: Conducteur[]) => {
        this.conducteur = data;
        this.dataSource.data = this.conducteur;
      },
      error => {
        console.error('Erreur lors de la récupération des voyages :', error);
      }
    );
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDeleteButton(conducteur: Conducteur) {
    Swal.fire({
      title: 'Are you sure you want to delete this voyage?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.conducteurService.deleteConducteur(conducteur.id).subscribe({
          next: (resp) => {
            Swal.fire('Deleted successfully!', '');
            window.location.reload(); // Actualiser la page
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }


  openEditForm(conducteur: Conducteur) {
    this.router.navigateByUrl(`/Conducteur/edit-Conducteur/${conducteur.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddConducteurComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Add:', result);
      }
    });
  }

  handleDetailsButton(conducteur: Conducteur) {
    Swal.fire({
      title: 'Détails du conducteur',
      html: `Consommation de carburant: ${conducteur.consommationCarburant}<br> vitesseMoyenne: ${conducteur.vitesseMoyenne}`,
    });
  }
}
