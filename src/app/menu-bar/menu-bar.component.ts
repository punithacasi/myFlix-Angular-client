import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(public router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  // This is the function responsible for sending the form inputs to the backend
  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out successfully', 'OK', {
      duration: 2000
    });
  }

}
