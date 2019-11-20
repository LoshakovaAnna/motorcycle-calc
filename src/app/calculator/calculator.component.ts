import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { MotorcycleModel } from '../shared/motorcycle.model';
import { MOCK } from '../shared/mockdata';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})

export class CalculatorComponent {
  dataForm = new FormGroup({
    motocycle: new FormControl('', Validators.required),
    heightRider: new FormControl('', Validators.required),
    legLength: new FormControl('', Validators.required),
  });

  motocycles: MotorcycleModel[];

  constructor() {
    this.motocycles = MOCK.models;
  }

  getImgUrl() {
    if (this.dataForm) {
      if (this.dataForm.value.motocycle) {
        if (this.dataForm.value.motocycle.urlImg) {
          return this.dataForm.value.motocycle.urlImg;
        }
      }
    }
    return '';
  }

  getHeightSaddle() {
    if (this.dataForm) {
      if (this.dataForm.value.motocycle) {
        if (this.dataForm.value.motocycle.heightSaddle) {
          return this.dataForm.value.motocycle.heightSaddle;
        }
      }
    }
    return null;
  }

  getScale() {
    if (this.dataForm) {
      if (this.dataForm.value.motocycle) {
        if (this.dataForm.value.motocycle.scale) {
          return this.dataForm.value.motocycle.scale;
        }
      }
    }
    return null;
  }

  getCoordinatesCenterSaddle() {
    if (this.dataForm) {
      if (this.dataForm.value.motocycle) {
        if (this.dataForm.value.motocycle.coordinatesCenterSaddle) {
          return this.dataForm.value.motocycle.coordinatesCenterSaddle;
        }
      }
    }
    return null;
  }

  getCoordinatesCenterSaddleX() {
    if (this.getCoordinatesCenterSaddle().x) {
      return this.dataForm.value.motocycle.coordinatesCenterSaddle.x;
    }
    return null;
  }

  getCoordinatesCenterSaddleY() {
    if (this.getCoordinatesCenterSaddle().y) {
      return this.dataForm.value.motocycle.coordinatesCenterSaddle.y;
    }
    return null;
  }

  onChangeInputHeightRider() {
    console.log(this.dataForm.controls.heightRider.value);
  }

  onChangeInputLegLength() {
    console.log(this.dataForm.controls.legLength.value);
  }

  onChangeSelectMoto() {
    console.log(this.dataForm.controls.motocycle.value);
  }
}
