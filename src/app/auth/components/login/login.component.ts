import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['tour@of.heroes', [Validators.email, Validators.required],],
    senha: ['', [Validators.required, Validators.minLength(10)]],
  })


  constructor(private authService: AuthService, private fb: FormBuilder) { }

  onSubmit() {
    if (this.form.valid) {
      //this.authService.login(this.form.value);
    }

  }


}
