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
  constructor() {
    this.motocycles = MOCK.models;
    this.canvasLeg = new p5(this.sketch, 'canvas-human');
    this.canvasLeg.setup = () => {
      this.canvasLeg.createCanvas(1000, 560);
      this.canvasLeg.noLoop();
    };
  }

  dataForm = new FormGroup({
    motocycle: new FormControl('', Validators.required),
    heightRider: new FormControl('', Validators.required),
    legLength: new FormControl('', Validators.required),
  });

  private canvasLeg;

  motocycles: MotorcycleModel[];

  private sketch(p: any) {
    const draft = {
      xSaddle: null,
      ySaddle: null,
      xMedianaCorner: null,
      yInMiddle: null,
      heightSaddlePixel: null,
      legPixel: null,
      footPixel: null,
      corner: null,
    };
    let isShouldDraw = false;

    p.passValue = (value) => {
      isShouldDraw = true;
      if ((typeof value) === 'object') {
        for (const key in value) {
          if (value[key] === null) {
            isShouldDraw = false;
          }
          draft[key] = value[key];
        }
      } else {
        isShouldDraw = false;
      }
    };

    p.draw = () => {
      if (isShouldDraw) {
        p.stroke(20, 233, 36);
        p.strokeWeight(3);
        if (draft.corner) {
          p.line(draft.xSaddle, draft.ySaddle, draft.xSaddle + draft.xMedianaCorner, draft.ySaddle + draft.yInMiddle);
          p.line(draft.xSaddle, draft.ySaddle + draft.heightSaddlePixel, draft.xSaddle + draft.xMedianaCorner, draft.ySaddle + draft.yInMiddle);
          p.line(draft.xSaddle, draft.ySaddle + draft.heightSaddlePixel, draft.xSaddle + draft.footPixel, draft.ySaddle + draft.heightSaddlePixel);
        } else {
          p.line(draft.xSaddle, draft.ySaddle, draft.xSaddle, draft.ySaddle + draft.legPixel);
          p.line(draft.xSaddle, draft.ySaddle + draft.legPixel, draft.xSaddle + draft.footPixel, draft.ySaddle + draft.legPixel);
        }
      }
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
