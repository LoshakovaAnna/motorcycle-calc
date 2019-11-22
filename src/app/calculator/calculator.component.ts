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

  getHeightRider() {
    return (((this.dataForm) && (this.dataForm.value) && (this.dataForm.value.heightRider)) || null);
  }

  onChangeInputHeightRider() {
    console.log(this.dataForm.controls.heightRider.value);
  }

  onChangeInputLegLength() {
    console.log(this.dataForm.controls.legLength.value);
  }

  onChangeSelectMoto() {
    console.log(this.dataForm.controls.motocycle.value);
    this.canvasLeg.clear();
  }

  showLeg() {
    const xSaddle = this.getCoordinatesCenterSaddleX();
    const ySaddle = this.getCoordinatesCenterSaddleY();
    const heightRider = this.getHeightRider();
    const heightSaddle = this.getHeightSaddle();
    const scale = this.getScale();

    const heightRiderPixel = scale * heightRider;
    const heightSaddlePixel = (scale * heightSaddle) / 10; // cm

    const legPixel = heightRiderPixel / 2;
    const waistToKneePixel = legPixel / 2;
    const kneeToFootPixel = legPixel / 2;
    const footPixel = heightRiderPixel / 7;

    const yInMiddle = heightSaddlePixel / 2;
    const xMedianaCorner = Math.sqrt(Math.pow(waistToKneePixel, 2) - Math.pow(yInMiddle, 2));

    if (legPixel > heightSaddlePixel) {
      this.canvasLeg.passValue({
        xSaddle, ySaddle, xMedianaCorner, yInMiddle, heightSaddlePixel, footPixel, corner: true,
      });
    }
    if (legPixel <= heightSaddlePixel) {
      this.canvasLeg.passValue({
        xSaddle, ySaddle, legPixel, footPixel, corner: false,
      });
    }

    this.canvasLeg.clear();
    this.canvasLeg.redraw();
  }
}
