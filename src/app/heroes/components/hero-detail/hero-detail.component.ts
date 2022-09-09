import { Location } from "@angular/common";
import { Component, Input, OnInit} from "@angular/core";
import { Hero } from "../../../core/models/hero.model";
import { HeroService } from "../../../core/services/hero.service";
import { ActivatedRoute } from "@angular/router"
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component ({
  selector: 'app-hero-detail',
  templateUrl:'./hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id: [{value: 0, disabled: true}],
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

 constructor (private heroService: HeroService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar) {

 }

 ngOnInit(): void {
  this.getHero();
 }

 getHero(): void {
  const paramId = this.route.snapshot.paramMap.get('id');

  if (paramId != 'new'){
    this.isEditing = true;

    const id = Number(paramId);
    this.heroService.getOne(id).subscribe((hero) => {
      this.hero = hero;
      this.form.controls['id'].setValue(hero.id);
      this.form.controls['name'].setValue(hero.name);

  });
}


 }

 goBack(): void {
  this.location.back()
 }



 /*isFormValid(): boolean{
  return !! this.hero.name.trim()
 }
*/
 //se vier vazio = ''
 //negar o vazio 1x = ! = true
 //negar o vazio 2x = !! = false

 create(): void {
  const { valid, value } = this.form

  if(valid){
    const hero: Hero = {
      name: value.name,
    } as Hero;
    this.heroService.create(hero).subscribe(() => this.goBack())
  } else {
    this.showErrorMsg();
  }
 }

 update(): void {

  const { valid, value } = this.form;

  if(valid){
    const hero: Hero = {
      id: this.hero.id,
      name: value.name,
    };
    this.heroService.update(hero).subscribe(() => this.goBack())
  } else {
    this.showErrorMsg()
  }
 }

 private showErrorMsg(): void {
  this.snackBar.open('Por favor, verifique os erros encontrados','Ok',{
    duration: 5000,
    verticalPosition: 'top'
  })
 }
}
