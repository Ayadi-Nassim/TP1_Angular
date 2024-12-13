import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
} from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, map, switchMap, catchError, tap } from 'rxjs/operators';
import { CvService } from '../services/cv.service';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class cinAsyncValidator implements AsyncValidator {
  cvService = inject(CvService);

  validate(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    return this.cvService.selectByProperty('cin', control.value).pipe(
      map((cvs) => (cvs.length === 0 ? null : { cinTaken: true })),
      catchError(() => of(null))
    );

    // return of(control.value).pipe(
    //   debounceTime(500),
    //   switchMap((cin) =>
    //     this.cvService.selectByProperty('cin', cin).pipe(
    //       tap((cvs) => console.log(cvs)),
    //       map((cvs) => (cvs.length === 0 ? null : { cinTaken: true })),
    //       catchError(() => of(null))
    //     )
    //   )
    // );
  }
}
