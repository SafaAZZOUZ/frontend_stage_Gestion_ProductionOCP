import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AccountService } from '../../../services/account.service'; // Assurez-vous d'importer le service approprié
import { AppUser } from '../../../model/user.model'; // Assurez-vous d'importer le modèle approprié

@Component({
  selector: 'app-edit',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  updateFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService // Injectez le service AccountService
  ) {}

  ngOnInit() {
    this.updateFormGroup = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
    this.loadUser();
  }

  loadUser() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.accountService.getUserById(userId).subscribe(
        (user: AppUser) => {
          this.updateFormGroup.patchValue(user);
        },
        error => {
          console.error('Error loading user:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.updateFormGroup.valid) {
      const updatedUser: AppUser = this.updateFormGroup.value;
      const userId = this.route.snapshot.params['id'];
      if (userId) {
        this.accountService.updateUser(userId, updatedUser).subscribe(
          () => {
            Swal.fire({
              position: 'center',
              title: 'User updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/AccountManagement']); // Rediriger après la mise à jour réussie
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
      }
    }
  }
}
