import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.user = this.getStoredUser();
    if (!this.user) {
      this.router.navigate(['welcome']);
    }
    this.getMovies();
  }

  /**
    * Method to safely get the stored user on session to the local variable
    * @method getStoredUser 
    */
  // 
  getStoredUser(): any {
    return JSON.parse(localStorage.getItem("user") || "");
  }

  /**
    * Method  to call getMovies API and assign data to the movie List variable
    * Assign favorite flag to the movie variable based on user data 
    * @method getMovies 
    */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      if (this.user.favorite?.length) {
        this.movies.forEach(obj => {
          obj.favoriteFlag = this.user.favorite.some((m: any) => m === obj._id);
        });
      }

      return this.movies;
    });
  }

  /**
    * Method to open dilog with Genre Component 
    * @method openGenre 
    */
  openGenre(movieName: any): void {
    this.dialog.open(GenreComponent, {
      width: '400px',
      data: {
        name: movieName
      }
    })
  }

  /**
    * Method to open dilog with Director Component  
    * @method openDirector 
    */
  openDirector(movieName: any): void {
    this.dialog.open(DirectorComponent, {
      width: '400px',
      data: {
        name: movieName
      }
    })
  }

  /**
    * Method to open dilog with MovieView Component   
    * @method openMovie 
    */
  openMovie(movieName: any): void {
    this.dialog.open(MovieViewComponent, {
      width: '600px',
      data: {
        name: movieName
      }
    })
  }

  /**
    * Method to call add Favorite movie API to save selected movie to user data
    * @method saveToFav 
    */
  saveToFav(movieID: any): void {
    this.fetchApiData.addUserFavoriteMovie(movieID).subscribe((resp: any) => {
      this.user.favorite.push(movieID);
      localStorage.setItem("user", JSON.stringify(this.user));
      this.movies.forEach(obj => {
        obj.favoriteFlag = this.user.favorite.some((m: any) => m === obj._id);
      });
    }, (resp: any) => {

    });
  }

  /**
    * Method to call Favorite movie API to delete selected movie to user data
    * @method removeFromFav 
    */
  removeFromFav(movieID: any): void {
    this.fetchApiData.deleteUserFavoriteMovie(movieID).subscribe((resp: any) => {
      this.user.favorite = this.user.favorite.filter((item: any) => item !== movieID);
      localStorage.setItem("user", JSON.stringify(this.user));
      this.movies.forEach(obj => {
        obj.favoriteFlag = this.user.favorite.some((m: any) => m === obj._id);
      });
    }, (resp: any) => {

    });
  }
}
