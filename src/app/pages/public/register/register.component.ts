import { Component, inject } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  router = inject(Router);

  idRequired = false;
  idLong = false;
  nameRequired = false;
  emailRequired = false;
  emailValid = false;
  passwordRequired = false;
  passwordLong = false;
  passwordValid = false;

  submitted = false;

  registerForm = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: this.builder.control('', Validators.required),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
      ])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
    bookmarks: this.builder.control([] as string[])
  });


  onSubmit = () => {
    this.submitted = true;
    this.displayErrors();
    if (this.registerForm.valid) {
      if (this.registerForm.valid) {
        const email = this.registerForm.value.email;
        const user = this.registerForm.value.id;
        this.authService.getByUser(user!).subscribe(
          (existingUserbyId) => {
            if (existingUserbyId) {
              this.toastr.warning("User with the same username already exist");
            } else {
              this.authService.getByEmail(email!).subscribe(
                (existingUserbyMail) => {
                  if (existingUserbyMail) {
                    this.toastr.warning('This email is already registered');
                  } else {
                    this.authService.registerUser(this.registerForm.value).subscribe(
                      (res) => {
                        this.toastr.success('Please contact admin for enable access', 'Register Successfully');
                        this.router.navigate(['login']);
                      }
                    );
                  }
                }
              );
            }
          } 
        );
      } else {
        this.toastr.warning('Please enter valid data');
      }
    }
    
  }

  displayErrors = () => {
    this.idRequired = this.registerForm.get('id')?.hasError('required')!;
    this.idLong = this.registerForm.get('id')?.hasError('minlength')!;
    this.nameRequired = this.registerForm.get('name')?.hasError('required')!;
    this.emailRequired = this.registerForm.get('email')?.hasError('required')!;
    this.emailValid = this.registerForm.get('email')?.hasError('email')!;
    this.passwordRequired = this.registerForm.get('password')?.hasError('required')!;
    this.passwordLong = this.registerForm.get('password')?.hasError('minlength')!;
    this.passwordValid = this.registerForm.get('password')?.hasError('pattern')!;
  }
}
