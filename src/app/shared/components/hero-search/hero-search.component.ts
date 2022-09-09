
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.model';
import { HeroService } from 'src/app/core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit{
  heroes$!: Observable<Hero[]>
  @Input() label = '';


  private searchTerm = new Subject<string>()
  @Output() private selected = new EventEmitter<Hero>()

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerm.next(term)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(term => this.heroService.search(term))
    )
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void {
   const hero: Hero = selectedItem.option.value
   this.searchTerm.next('')
   this.selected.emit(hero)
  }


}
