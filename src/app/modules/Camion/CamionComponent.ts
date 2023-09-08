import {Component, OnInit, ViewChild, Renderer2, Input} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Camion} from '../../model/Camion';
import {CamionService} from '../../services/camion.service';
import {AddCComponent} from './add-C/add-C.component';
import { Chart } from 'chart.js';
import {forkJoin} from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  @Input() camions: any[];
  apiResponse: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private camionService: CamionService,
    private renderer: Renderer2,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Camion>(this.camion);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getVoyages();
    this.getConducteursData();
    setInterval(() => {
      this.getVoyages();
    }, 60000); // 60000 ms = 1 minute

    const dataToSend = {
      consommationCarburant: 300,
      kilometrage: 1000};
    const apiUrl = 'http://localhost:5000/predict'; // Remplacez ceci par l'URL correcte de votre API

    // Effectuez l'appel API POST
    this.http.post(apiUrl, dataToSend).subscribe((response: any) => {
      // Stockez la réponse de l'API dans la variable apiResponse
      this.apiResponse = response;
    }, (error) => {
      // Gérez les erreurs ici
      console.error('Erreur lors de l\'appel de l\'API :', error);
    });
  }
  getVoyages() {
    this.camionService.getAllCamions().subscribe(
      (data: Camion[]) => {
        this.camion = data;
        this.dataSource.data = this.camion;

        // Parcourez les camions et affichez une notification si nécessaire
        this.camion.forEach(camion => {
          if (this.checkIfCamionWillStop(camion)) {
            Swal.fire({
              title: 'Camion qui va s\'arrêter',
              text: `Le camion ${camion.id} va s'arrêter !`,
              icon: 'warning'
            });
          }
        });
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
      <br>
      <h2>Liste des camions </h2>
      <br>
      <br>
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
  getConducteursData() {
    this.camionService.getAllCamions().subscribe(camions => {
      const camionIds = camions.map(camion => camion.id);
      const consommations$ = camionIds.map(id => this.camionService.getConducteurConsommation(id));
      const vitesses$ = camionIds.map(id => this.camionService.getConducteurVitesse(id));

      forkJoin(consommations$).subscribe(consommations => {
        forkJoin(vitesses$).subscribe(vitesses => {
          this.camions = camionIds.map((id, index) => ({
            id,
            consommation: consommations[index],
            vitesse: vitesses[index]
          }));
          this.initChart();
        });
      });
    });
  }

  initChart() {
    const labels = this.camions.map(camion => `Camion ${camion.id}`);
    const consommationData = this.camions.map(camion => camion.consommation);
    const vitesseData = this.camions.map(camion => camion.vitesse);

    new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Consommation',
            data: consommationData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'kilometrage',
            data: vitesseData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  printChart() {
    const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Chart</title></head><body>');
    printWindow.document.write('<img src="' + chartCanvas.toDataURL() + '">');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  checkIfCamionWillStop(camion: Camion): boolean {
    // Ajoutez vos critères de vérification ici
    return camion.consommationCarburant > 300 && camion.kilometrage > 1000;
  }
}

