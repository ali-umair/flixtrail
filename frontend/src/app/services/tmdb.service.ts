import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../../../environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  /**
   * Generic GET request to TMDB API
   */
  private get<T>(endpoint: string, params: { [key: string]: string } = {}): Observable<T> {
    const fullParams = { ...params, api_key: TMDB_API_KEY };
    const httpParams = new HttpParams({ fromObject: fullParams });
    return this.http.get<T>(`${TMDB_BASE_URL}/${endpoint}`, { params: httpParams });
  }

  /**
  * Example: Fetch Popular Movies
  */
  getPopularMovies(page: number = 1): Observable<any> {
    return this.get('movie/popular', { page: page.toString() });
  }

  getNowPlayingMovies(page: number = 1): Observable<any> {
    return this.get('movie/now_playing');
  }

  getTopRatedMovies(page: number = 1): Observable<any> {
    return this.get('movie/top_rated');
  }

  getPopularShows(page: number = 1): Observable<any> {
    return this.get('tv/popular', { page: page.toString() });
  }

  getOnTheAirShows(page: number = 1): Observable<any> {
    return this.get('tv/on_the_air');
  }

  getTopRatedShows(page: number = 1): Observable<any> {
    return this.get('tv/top_rated');
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.get('search/movie', { query, page: page.toString() });
  }

  getAllImgesByShowId(id: string, page: number = 1): Observable<any> {
    return this.get(`tv/${id}/images`);
  }

  getAllImgesByMovieId(id: string, page: number = 1): Observable<any> {
    return this.get(`movie/${id}/images`);
  }
}
