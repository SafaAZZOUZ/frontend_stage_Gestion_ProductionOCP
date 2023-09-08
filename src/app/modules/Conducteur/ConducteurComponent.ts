import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Conducteur} from '../../model/Conducteur';
import {ConducteurService} from '../../services/conducteur.service';
import {AddConducteurComponent} from './add-Conducteur/add-Conducteur.component';
import {forkJoin} from 'rxjs';
import { Chart } from 'chart.js';

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
  selectedC: Conducteur;
  @Input() conducteurs: any[];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private conducteurService: ConducteurService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Conducteur>(this.conducteur);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getConducteur();
    //this.getConducteursData();
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
      title: 'Are you sure you want to delete this Conducteur?',
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
    this.selectedC = conducteur;
    Swal.fire({
      title: 'Détails du conducteur',
      html: `
      <table>
        <tr>
        <td>Consommation de carburant:</td>
          <td>${conducteur.consommationCarburant}</td>
        </tr>
        <tr>
          <td>Vitesse moyenne:</td>
          <td>${conducteur.vitesseMoyenne}</td>
        </tr>
      </table>
    `,
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
      <h2>Liste des Conducteurs</h2>
      <br>
      <br>
<br>
<table>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Date d'Embuche</th>
            <th>Consommation de carburant</th>
            <th>Vitesse moyenne</th>
          </tr>
          ${this.conducteur.map(conducteur => `
            <tr>
              <td>${conducteur.id}</td>
              <td>${conducteur.nom}</td>
              <td>${conducteur.prenom}</td>
              <td>${conducteur.dateEm}</td>
              <td>${conducteur.consommationCarburant}</td>
              <td>${conducteur.vitesseMoyenne}</td>
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
    this.conducteurService.getAllConducteurs().subscribe(conducteurs => {
      const conducteurIds = conducteurs.map(conducteur => conducteur.id);
      const consommations$ = conducteurIds.map(id => this.conducteurService.getConducteurConsommation(id));
      const vitesses$ = conducteurIds.map(id => this.conducteurService.getConducteurVitesse(id));

      forkJoin(consommations$).subscribe(consommations => {
        forkJoin(vitesses$).subscribe(vitesses => {
          this.conducteurs = conducteurIds.map((id, index) => ({
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
    const labels = this.conducteurs.map(conducteur => `Conducteur ${conducteur.id}`);
    const consommationData = this.conducteurs.map(conducteur => conducteur.consommation);
    const vitesseData = this.conducteurs.map(conducteur => conducteur.vitesse);

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
            label: 'Vitesse',
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
}
