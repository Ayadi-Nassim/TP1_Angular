import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrls: ['./master-details-cv.component.css']
})
export class MasterDetailsCvComponent implements OnInit {
  cvs: Cv[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cvs = data['cvList']; 
    });
  }

  goToCvDetails(cv: Cv) {
    this.router.navigate([cv.id], { relativeTo: this.route });
  }
}