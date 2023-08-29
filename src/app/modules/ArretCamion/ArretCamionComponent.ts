import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ArretCamion} from '../../model/ArretCamion';
import {ArretService} from '../../services/arret.service';
import {AddCamionComponent} from './add-Camion/add-Camion.component';

@Component({
  selector: 'app-posts',
  templateUrl: './ArretCamionComponent.html',
  styleUrls: ['./ArretCamionComponent.scss']
})
export class ArretCamionComponent implements OnInit {
  arret: ArretCamion[] = [];
  dataSource: MatTableDataSource<ArretCamion>;
  columns: string[] = ['id', 'dateHeure', 'cause', 'duree', 'camion', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private arretService: ArretService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ArretCamion>(this.arret);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getArret();
  }

  getArret() {
    this.arretService.getAllArret().subscribe(
      (data: ArretCamion[]) => {
        this.arret = data;
        this.dataSource.data = this.arret;
      },
      error => {
        console.error('Erreur lors de la récupération  :', error);
      }
    );
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDeleteButton(arret: ArretCamion) {
    Swal.fire({
      title: 'Are you sure you want to delete this voyage?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.arretService.deleteArret(arret.id).subscribe({
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


  openEditForm(arret: ArretCamion) {
    this.router.navigateByUrl(`/Arret/edit-Camion/${arret.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddCamionComponent, {
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
