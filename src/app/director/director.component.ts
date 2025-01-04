import { Component, OnInit, Inject } from '@angular/core';
// You'll use this import to close the dialog on success
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  movie: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DirectorComponent>,
    public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getMovie(this.data.name).subscribe((resp: any) => {
      this.movie = resp;
      if (this.movie.director.birthDate) {
        this.movie.director.birthDate = new Date(this.movie.director.birthDate).toISOString().split('T')[0];
      }
      if (this.movie.director.dearthDate) {
        this.movie.director.dearthDate = new Date(this.movie.director.dearthDate).toISOString().split('T')[0];
      }
      return this.movie;
    });
  }

  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
