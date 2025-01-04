import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar) {

    let user = JSON.parse(localStorage.getItem("user") || "");
    this.userData.userName = user.userName;
    this.userData.firstName = user.firstName;
    this.userData.lastName = user.lastName;
    this.userData.email = user.email;
    this.userData.birthDate = new Date(user.birthDate).toISOString().split('T')[0];
    this.userData.password = null;
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    let user: any = {};
    user.userName = this.userData.userName;
    user.firstName = this.userData.firstName;
    user.lastName = this.userData.lastName;
    //user.email = this.userData.email;
    if (this.userData.password) {
      user.password = this.userData.password;
    }
    user.birthDate = this.userData.birthDate;

    this.fetchApiData.editUser(user).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)    
      this.snackBar.open('Profile updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
