import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv: Cv | null = null;

  constructor(
    private cvService: CvService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.cv = data['cv'];
      },
      error: () => {
        this.toastr.error('Failed to load CV details.');
        this.router.navigate([APP_ROUTES.cv]); 
      },
    });
  }

  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).pipe(catchError(()=>{
      this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
          return of(null);
    })).subscribe({
        next: () => {
          this.toastr.success(`${cv.name} supprimé avec succès`);
          this.router.navigate([APP_ROUTES.cv]);
        },
      });
  }
}