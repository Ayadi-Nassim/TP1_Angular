import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
@Injectable({
  providedIn: 'root',
})
export class CvResolver implements Resolve<Cv> {
  constructor(private cvService: CvService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Cv> {
    const id = +route.paramMap.get('id')!;
    return this.cvService.getCvById(id);
  }
}