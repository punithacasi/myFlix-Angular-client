import { Component, OnInit, Inject } from '@angular/core';
// You'll use this import to close the dialog on success
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  movie: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieViewComponent>,
    public fetchApiData: FetchApiDataService) { }
  ngOnInit(): void {
    this.getMovies();
  }

  /**
    * Method  to call getMovies API and assign data to the movie List variable
    * Assign favorite flag to the movie variable based on user data 
    * @method getMovies 
    */
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
