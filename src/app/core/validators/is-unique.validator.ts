import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UniqueCheckConfig } from './types';
import { BaseHttpService } from '../abstracts/base-http.service';

export function uniqueValidator<TReq, TRes, TValue, THttp extends BaseHttpService>(
  http: THttp,
  config: UniqueCheckConfig<TReq, TRes, TValue>
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return from(http.post<TReq, TRes>(config.endpoint, config.body(control.value))).pipe(
      map((res) => (config.isUnique(res) ? null : { notUnique: true })),
      catchError(() => of(null))
    );
  };
}
