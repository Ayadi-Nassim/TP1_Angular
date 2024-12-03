import { Component, inject } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router); 

  cvs: Cv[] = []; 
  loading = false; 

  get search(): AbstractControl {
    return this.form.get('search')!;
  }

  form = this.formBuilder.group({ search: [''] });

  constructor() {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(), //ignorer les doublons conséc
        tap(() => (this.loading = true)),
        switchMap((name) =>
          this.cvService
            .selectByName(name)
            .pipe(tap(() => (this.loading = false)))
        ) //switchmap annule les requetes en cours et lance le selectbyname
      )
      .subscribe({
        next: (cvs) => {
          this.cvs = cvs;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des CVs :', err);
          this.loading = false;
        },
      });
  }

  selectCv(cv: Cv) {
    this.router.navigate([`/cv/${cv.id}`]);
  }
}
