import { Component, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs$ = this.cvService.getCvs().pipe(
    catchError(() => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return EMPTY;
    })
  );
  selectedCv: Cv | null = null;
  date = new Date();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');

    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }
}
