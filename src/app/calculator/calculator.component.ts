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
    return (((this.dataForm) && (this.dataForm.value) && (this.dataForm.value.motocycle) && (this.dataForm.value.motocycle.urlImg)) || '');
  }

  getHeightSaddle() {
    return (((this.dataForm) && (this.dataForm.value) && (this.dataForm.value.motocycle) && (this.dataForm.value.motocycle.heightSaddle)) || null);
  }

  getScale() {
    return (((this.dataForm) && (this.dataForm.value) && (this.dataForm.value.motocycle) && (this.dataForm.value.motocycle.scale)) || null);
  }

  getCoordinatesCenterSaddle() {
    return (((this.dataForm) && (this.dataForm.value) && (this.dataForm.value.motocycle) && (this.dataForm.value.motocycle.coordinatesCenterSaddle)) || null);
  }

  getCoordinatesCenterSaddleX() {
    return (((this.getCoordinatesCenterSaddle()) && (this.dataForm.value.motocycle.coordinatesCenterSaddle.x)) || null);
  }

  getCoordinatesCenterSaddleY() {
    return (((this.getCoordinatesCenterSaddle()) && (this.dataForm.value.motocycle.coordinatesCenterSaddle.y)) || null);
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
