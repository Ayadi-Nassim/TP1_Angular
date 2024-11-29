import { Component, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { catchError, EMPTY, map } from 'rxjs';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  // Fetch CVs once and split into juniors and seniors
  juniors$ = this.cvService.getCvs().pipe(
    map((cvs) => cvs.filter((cv) => cv.age < 40)),
    catchError(() => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return EMPTY;
    })
  );

  seniors$ = this.cvService.getCvs().pipe(
    map((cvs) => cvs.filter((cv) => cv.age >= 40)),
    catchError(() => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return EMPTY;
    })
  );

  selectedCv: Cv | null = null;

  constructor() {
    // Log and notify when the component is initialized
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');

    // Subscribe to the selected CV observable
    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }
}