import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  roles!: string | null;
  userId: any;
  constructor() { }

  ngOnInit() {
    this.roles = localStorage.getItem('ROLES');
    // tslint:disable-next-line:triple-equals
    if (localStorage.getItem('id') != undefined) {
      this.userId = localStorage.getItem('id');
    }
  }

}
