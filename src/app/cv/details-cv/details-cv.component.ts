import { Component, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);

  cv$: Observable<Cv | null>;

  constructor() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.cv$ = this.cvService.getCvById(id).pipe(
      catchError((error) => {
        this.toastr.error('Erreur lors du chargement du CV');
        this.router.navigate([APP_ROUTES.cv]);
        return EMPTY; // Renvoie un observable vide pour continuer le flux même en cas d'erreur
      })
    );
  }
  deleteCv(cv: Cv) {
    this.cvService
      .deleteCvById(cv.id)
      .pipe(
        catchError(() => {
          this.toastr.error(
            "Problème avec le serveur, veuillez contacter l'admin"
          );
          return EMPTY; // Empêche l'interruption du flux en cas d'erreur
        })
      )
      .subscribe(() => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      });
  }
}
