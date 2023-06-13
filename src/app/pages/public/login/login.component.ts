import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor() {
    sessionStorage.clear();
  }

  builder = inject(FormBuilder);
  toastr = inject(ToastrService);
  router = inject(Router);
  loginService = inject(AuthService);

  emailRequired = false;
  emailValid = false;
  passwordRequired = false;
  passwordLong = false;
  passwordValid = false;

  userData: any;
  submitted = false;

  loginForm = this.builder.group({
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
      ])
    ),
  });

  onSubmit = () => {
    this.submitted = true;
    this.displayErrors();
    if (this.loginForm.valid) {
      this.loginService
        .getByEmail(this.loginForm.value.email!)
        .subscribe((user) => {
          if (user) {
            this.userData = user;
            if (this.userData.password === this.loginForm.value.password) {
              if (this.userData.isActive) {
                this.toastr.success(
                  `User ${this.userData.id} logged with SuccessFully`
                );
                sessionStorage.setItem('currentUser', this.userData.id);
                this.router.navigate(['characters']);
              } else {
                this.toastr.error('Please contact admin', 'Inactive User');
              }
            } else {
              this.toastr.error('Invalid credentials');
            }
          } else {
            this.toastr.error('User not found!');
          }
        });
    }
  };

  displayErrors = () => {
    this.emailRequired = this.loginForm.get('email')?.hasError('required')!;
    this.emailValid = this.loginForm.get('email')?.hasError('email')!;
    this.passwordRequired = this.loginForm
      .get('password')
      ?.hasError('required')!;
    this.passwordLong = this.loginForm.get('password')?.hasError('minlength')!;
    this.passwordValid = this.loginForm.get('password')?.hasError('pattern')!;
  };
}
