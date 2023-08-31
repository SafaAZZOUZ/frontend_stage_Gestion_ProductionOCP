import { Component, OnInit, ViewChild, Renderer2  } from '@angular/core';
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
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selectedCamion: Camion;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private camionService: CamionService,
    private renderer: Renderer2) {
  }

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
    this.selectedCamion = camion;
    Swal.fire({
      title: 'Détails du camion',
      html: `
      <table>
        <tr>
          <td>Consommation de carburant:</td>
          <td>${camion.consommationCarburant}</td>
        </tr>
        <tr>
          <td>Vitesse moyenne:</td>
          <td>${camion.kilometrage}</td>
        </tr>
      </table>
    `,
    });
  }

  openEditForm(camion: Camion) {
    this.router.navigateByUrl(`/Camion/edit-C/${camion.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddCComponent, {
      width: '400px',
      data: {mode: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Add:', result);
      }
    });
  }

  printTable() {
    const printContents = `
    <html>
      <head>
        <style>
body {
font-family: Arial, sans-serif;
font-size: 14px;
margin: 0;
color: #333;
}

table {
width: 100%;
border-collapse: collapse;
}

th, td {
padding: 12px;
border: 1px solid #e0e0e0;
text-align: left;
}

th {
background-color: #f5f5f5;
font-weight: bold;
}

td {
background-color: #fff;
}

.example-button-row {
margin-bottom: 20px;
}

button {
margin-right: 10px;
}

dust
Copy
    </style>
      </head>
      <body>
        <table>
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Date de Maintenance</th>
            <th>Consommation de carburant</th>
            <th>Vitesse moyenne</th>
          </tr>
          ${this.camion.map(camion => `
            <tr>
              <td>${camion.id}</td>
              <td>${camion.marque}</td>
              <td>${camion.modele}</td>
              <td>${camion.dateMaintenance}</td>
              <td>${camion.consommationCarburant}</td>
              <td>${camion.kilometrage}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(printContents);
    printWindow.document.close();
    printWindow.print();
  }
}
