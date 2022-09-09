import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit{
  /*hero: Hero = {
    id: 1,
    name: 'Capitão Guelisson'
  }
*/
  displayedColumns: string[] = ['id','name','actions']
  herois: Hero[] = []

  /*selectedHero?: Hero*/

  constructor(private heroService: HeroService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getAll().subscribe(heroes => this.herois = heroes)
  }
  /*onSelect(hero: Hero): void {
    this.selectedHero = hero
    this.messageService.add(`HeroesComponent: Selected hero id = ${hero.id}`)
  }*/

  delete(hero: Hero): void{
    const dialogData: DialogData = {
      cancelText:'Cancelar',
      confirmText:'Deletar',
      content: `Tem certeza que deseja deletar '${hero.name}'?`
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: dialogData
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.delete(hero).subscribe(() => {
            /*  this.herois = this.herois.filter((h) => h != hero)*/
            this.getHeroes()
            })
      }
    })

  }

  onSelected(hero: Hero): void {
    this.delete(hero)
  }
}
