import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export const futureDateValidator = (initialValue: string) => {
  const innerFutureDateValidatorInner = (control: AbstractControl) => {
    if (control.value === initialValue) {
      return null;
    }
    if (control.value === null || control.value === '') {
      return null;
    }
    const date = moment(control.value, 'YYYY-MM-DD');
    const today = moment().startOf('day');
    const dateIsInFuture = moment.duration(date.diff(today)).days() >= 1;
    return dateIsInFuture
      ? null
      : { futureDateValidator: `Date must be in future!` };
  };

  return (control: AbstractControl) => innerFutureDateValidatorInner(control);
};
