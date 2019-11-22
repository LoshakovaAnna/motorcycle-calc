import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as p5 from 'p5';

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

  private canvasLeg;

  motocycles: MotorcycleModel[];

  constructor() {
    this.motocycles = MOCK.models;
    this.canvasLeg = new p5(this.sketch, 'canvas-human');
    this.canvasLeg.setup = () => {
      this.canvasLeg.createCanvas(1000, 560);
      this.canvasLeg.noLoop();
    };
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
