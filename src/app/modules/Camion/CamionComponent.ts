import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Camion} from '../../model/Camion';
import {CamionService} from '../../services/camion.service';
import {AddCComponent} from './add-C/add-C.component';

@Component({
  selector: 'app-posts',
  templateUrl: './CamionComponent.html',
  styleUrls: ['./CamionComponent.scss']
})
export class CamionComponent implements OnInit {
  camion: Camion[] = [];
  dataSource: MatTableDataSource<Camion>;
  columns: string[] = ['id', 'marque', 'modele', 'dateMaintenance', 'details', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private camionService: CamionService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Camion>(this.camion);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getVoyages();
  }

  getVoyages() {
    this.camionService.getAllCamions().subscribe(
      (data: Camion[]) => {
        this.camion = data;
        this.dataSource.data = this.camion;
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

  handleDeleteButton(camion: Camion) {
    Swal.fire({
      title: 'Are you sure you want to delete this voyage?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.camionService.deleteCamion(camion.id).subscribe({
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
  showDetails(camion: Camion) {
    Swal.fire({
      title: 'Détails du camion',
      html: `Consommation de carburant: <br> ${camion.consommationCarburant} <br> Vitesse moyenne: <br> ${camion.kilometrage}`,
    });
  }

  openEditForm(camion: Camion) {
    this.router.navigateByUrl(`/Camion/edit-C/${camion.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddCComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Add:', result);
      }
    });
  }
}

