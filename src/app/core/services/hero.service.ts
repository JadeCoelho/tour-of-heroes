import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`


  constructor(private http: HttpClient, private messageService: MessageService){

  }

  getAll(): Observable<Hero[]>{
   /* const heroes = of(HEROES)
    this.log()
    return heroes*/

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes) => this.log(`fetched ${heroes.length} heroes`))
    )
  }

//GET /heroes
  getOne(id: number): Observable<Hero> {
    /*const hero = HEROES.find(hero => hero.id === id)!;
    this.log(`fetched hero id = ${id}`);
    return of(hero)*/

    return this.http.get<Hero>(this.getUrl(id))
    .pipe(tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`)));

  }


  //post: /heroes
  create(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero) => this.log(`Created ${this.descAttributes(hero)}`))
    )
  }

  //put: /heroes/id
  update(hero: Hero): Observable<Hero>{
    return this.http.put<Hero>(this.getUrl(hero.id),hero).pipe(
      tap((hero) => this.log(`Updated ${this.descAttributes(hero)}`))
    )
  }

  //delete: /heroes/id
  delete(hero: Hero): Observable<any>{
    return this.http.delete<any>(this.getUrl(hero.id)).pipe(
      tap(() => this.log(`Deleted ${this.descAttributes(hero)}`))
    )
  }

  //get: /heroes?name=term
  search(term: string): Observable<Hero[]> {
    if (!term.trim()){
      return of([])
    }
    return this.http
    .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
    .pipe(
      tap((heroes) =>
      heroes.length ?
      this.log(`found ${heroes.length} hero(es) matching '${term}'`) : this.log(`no hero(es) matching '${term}'`)
      )
      );
  }

  private descAttributes(hero: Hero): string {
    return `Hero id = ${hero.id} and name = ${hero.name}`
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`)
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`
  }
}
