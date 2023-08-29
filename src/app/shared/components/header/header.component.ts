import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  roles!: string | null;
  userId: any;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.roles = localStorage.getItem('ROLES');
    // tslint:disable-next-line:triple-equals
    if (localStorage.getItem('id') != undefined) {
      this.userId = localStorage.getItem('id');
    }
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  signOut() {
    this.router.navigate(['/login']);
  }

  management() {
    this.router.navigate(['/AccountManagement']);
  }
}
