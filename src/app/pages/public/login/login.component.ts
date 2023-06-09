import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  PasswordUtils  from 'src/utils/passwordValidator';
import  EmailUtils from 'src/utils/emailValidator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

const user = {
  email: null,
  password: null
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm!: FormGroup;

  submitted = false;


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [user && user.email ? user.email : '', [Validators.required, EmailUtils.createEmailValidator()]],
      password: [user && user.password ? user.password : '',[Validators.required, PasswordUtils.createPasswordValidator()]],
    })
  }

  onSubmit = (form: any) => {
    this.submitted = true;
    if (this.loginForm.valid) {
      const email = form.value.email;
      const password = form.value.password;

      const isAuthenticated = this.authService.login(email, password);
      if(isAuthenticated)
          this.router.navigate(['home']);
      else 
          alert('Invalid username or password');
    }
    }


}

