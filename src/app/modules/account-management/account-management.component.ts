import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUser } from '../../model/user.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account.service';
import { AddUserComponent } from './add-User/add-User.component';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  users: AppUser[] = [];
  dataSource: MatTableDataSource<AppUser>;
  columns: string[] = ['id', 'username', 'email', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<AppUser>(this.users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  getUsers() {
    this.accountService.getUsers().subscribe(
      (data: AppUser[]) => {
        this.users = data;
        this.dataSource.data = this.users;
      },
      error => {
        console.error('Error retrieving users:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(user: AppUser) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteUser(user.id).subscribe({
          next: (resp) => {
            Swal.fire('Deleted successfully!', '');
            this.getUsers(); // Refresh users to reflect updated list
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
  assignRoleToUser(user: AppUser, roleName: string) {
    const roleUserForm = {
      username: user.username,
      roleName: roleName
    };

    this.accountService.addRoleToUser(roleUserForm).subscribe(
      () => {
        console.log('Role added to user:', user.username);
        this.getUsers(); // Rafraîchir les utilisateurs pour refléter les rôles mis à jour
      },
      error => {
        console.error('Error adding role to user:', error);
      }
    );
  }

  openEditForm(user: AppUser) {
    this.router.navigateByUrl(`/AccountManagement/edit-User/${user.id}`);
  }

  openAddForm() {
    const dialogRef = this.dialog.open(AddUserComponent, {
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
