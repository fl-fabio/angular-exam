import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

class PasswordUtils {

  static readonly createPasswordValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) { return null; }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
      return !passwordValid ? { passwordStrength: true } : null;
    }
  }

}

export default PasswordUtils;

