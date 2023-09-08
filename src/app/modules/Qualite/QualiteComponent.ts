import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Qualite} from '../../model/Qualite';
import {QualiteService} from '../../services/qualite.service';
import {AddQualiteComponent} from './add-Qualite/add-Qualite.component';


@Component({
  selector: 'app-posts',
  templateUrl: './QualiteComponent.html',
  styleUrls: ['./QualiteComponent.scss']
})
export class QualiteComponent implements OnInit {
  qualite: Qualite[] = [];
  dataSource: MatTableDataSource<Qualite>;
  columns: string[] = ['id', 'tauxSatisfaction', 'tauxDefauts', 'dateEvaluation', 'commentaires', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private qualiteService: QualiteService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Qualite>(this.qualite);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getQualite();
  }

  getQualite() {
    this.qualiteService.getAllQualites().subscribe(
      (data: Qualite[]) => {
        this.qualite = data;
        this.dataSource.data = this.qualite;
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

  handleDeleteButton(qualite: Qualite) {
    Swal.fire({
      title: 'Are you sure you want to delete this voyage?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.qualiteService.deleteQualite(qualite.id).subscribe({
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


  openEditForm(qualite: Qualite) {
    this.router.navigateByUrl(`/Qualite/edit-Qualite/${qualite.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddQualiteComponent, {
      width: '400px',
      data: { mode: 'add' }
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
        <br>
        <h2>Liste des qualité </h2>
          <tr>
            <th>ID</th>
            <th>quantite Ex</th>
            <th>commentaires</th>
            <th>date d'evaluation</th>
            <th>taux Defauts</th>
             <th>taux Satisfaction</th>
          </tr>
          ${this.qualite.map(qualite => `
            <tr>
              <td>${qualite.id}</td>
              <td>${qualite.quantiteEx}</td>
              <td>${qualite.commentaires}</td>
              <td>${qualite.dateEvaluation}</td>
              <td>${qualite.tauxDefauts}</td>
              <td>${qualite.tauxSatisfaction}</td>
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
