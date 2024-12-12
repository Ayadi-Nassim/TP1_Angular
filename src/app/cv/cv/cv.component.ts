import { Component, inject } from '@angular/core';
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

  private cvs$ = this.cvService.getCvs().pipe(
    catchError(() => {
      this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      return EMPTY;
    })
  );

  juniors$ = this.cvs$.pipe(
    map((cvs) => cvs.filter((cv) => cv.age < 40))
  );

  seniors$ = this.cvs$.pipe(
    map((cvs) => cvs.filter((cv) => cv.age >= 40))
  );

  constructor() {
    // Log and notify when the component is initialized
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
  }
}

