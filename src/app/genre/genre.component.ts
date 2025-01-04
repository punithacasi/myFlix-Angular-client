import { Component, OnInit, Inject } from '@angular/core';
// You'll use this import to close the dialog on success
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  movie: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenreComponent>,
    public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getMovie(this.data.name).subscribe((resp: any) => {
      this.movie = resp;
      return this.movie;
    });
  }

  closeMessageBox(): void {
    this.dialogRef.close();
  }
}