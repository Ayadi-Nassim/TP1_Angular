import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { CONSTANTES } from 'src/config/const.config';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group({
    name: ['', Validators.required],
    firstname: ['', Validators.required],
    path: [''],
    job: ['', Validators.required],
    cin: [
      '',
      {
        validators: [Validators.required, Validators.pattern('[0-9]{8}')],
      },
    ],
    age: [
      0,
      {
        validators: [Validators.required],
      },
    ],
  });

  ngOnInit() {
    this.form.get('age')?.valueChanges.subscribe((age) => {
      const path = this.form.get('path')!;
      if (age && age < 18) {
        path.reset();
        path.disable();
      } else {
        path.enable();
      }
    });

    const savedData = localStorage.getItem(CONSTANTES.ADD_CV_DATA_KEY);
    if (savedData) {
      this.form.patchValue(JSON.parse(savedData));
    }

    this.form.valueChanges.subscribe((data) => {
      localStorage.setItem(CONSTANTES.ADD_CV_DATA_KEY, JSON.stringify(data));
    });
  }

  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path() {
    return this.form.get('path');
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}
