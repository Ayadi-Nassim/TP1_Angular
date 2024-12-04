import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  selectedCv: Cv | null = null;
  cvs: Cv[] = [];
  constructor(
    private cvService: CvService,
    private route: ActivatedRoute,
  ) {}
   
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cvs = data['cvList']; 
    });
  }

  selectedCv$: Observable<Cv> = this.cvService.selectCv$;
}