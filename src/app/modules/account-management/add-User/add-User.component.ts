import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service'; // Assurez-vous d'importer le service approprié
import { AppUser } from '../../../model/user.model'; // Assurez-vous d'importer le modèle approprié

@Component({
  selector: 'app-add',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  user: AppUser = {
    id: 0,
    username: '',
    password: '',
    email: ''
  };

  constructor(
    private accountService: AccountService, // Injectez le service AccountService
    private router: Router
  ) {}

  onSubmit() {
    this.accountService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/AccountManagement']); // Redirigez vers la liste des utilisateurs après l'ajout
    });
  }
}
