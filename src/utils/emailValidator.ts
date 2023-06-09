import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

class EmailUtils {
    static readonly createEmailValidator = (): ValidatorFn => {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
          return null; // La validazione non è obbligatoria se il campo è vuoto
        }
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const isValid = emailPattern.test(value);
        return isValid ? null : { invalidEmail: true };
      };
    };
}

export default EmailUtils;