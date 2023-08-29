import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from '../Voyage/add/add.component';
import Swal from 'sweetalert2';
import { VoyageService } from 'src/app/services/voyage.service';
import { Voyage } from '../../model/Voyage';
import {DetailsDialogComponent} from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {
  voyages: Voyage[] = [];
  dataSource: MatTableDataSource<Voyage>;
  columns: string[] = ['id', 'itineraire', 'dateDepart', 'dateArrivee', 'details', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private voyageService: VoyageService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Voyage>(this.voyages);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getVoyages();
  }

  getVoyages() {
    this.voyageService.getAllVoyages().subscribe(
      (data: Voyage[]) => {
        this.voyages = data;
        this.dataSource.data = this.voyages;
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

  handleDeleteButton(voyage: Voyage) {
    Swal.fire({
      title: 'Are you sure you want to delete this voyage?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.voyageService.deleteVoyage(voyage.id).subscribe({
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


  openEditForm(voyage: Voyage) {
    this.router.navigateByUrl(`/Voyage/edit/${voyage.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Add:', result);
      }
    });
  }
  showDetails(voyage: Voyage) {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '400px',
      data: { voyage } // Passez le voyage à votre composant de dialogue
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Details dialog closed with result:', result);
      }
    });
  }
}
