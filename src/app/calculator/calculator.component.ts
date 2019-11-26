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
    this.canvasLeg = new p5(this.sketchLeg, 'canvas-human');
    this.canvasLeg.setup = () => {
      this.canvasLeg.createCanvas(1000, 560).position(0, 0);
      this.canvasLeg.noLoop();
    };
    this.canvasTors = new p5(this.sketchTorsAndArm, 'canvas-human');
    this.canvasTors.setup = () => {
      this.canvasTors.createCanvas(1000, 560).position(0, 0);
      this.canvasTors.noLoop();
    };
  }

  canvasLeg;

  canvasTors;

  riderValues = {
    height: null,
    heightRiderPixel: null,
    headPixel: null,
    neckPixel: null,
    torsPixel: null,
    palmPixel: null,
    armPixel: null,
    legPixel: null,
    waistToKneePixel: null,
    kneeToFootPixel: null,
    footPixel: null,
    coordinateWaist: {
      x: null,
      y: null,
    },
    coordinateKnee: {
      x: null,
      y: null,
    },
    coordinateFootOnGround: {
      x: null,
      y: null,
    },
    coordinatePalmCenter: {
      x: null,
      y: null,
    },
    coordinateShoulder: {
      x: null,
      y: null,
    },
  };

  motocycles: MotorcycleModel[];

  dataForm = new FormGroup({
    motocycle: new FormControl('', Validators.required),
    heightRider: new FormControl('', Validators.required),
    legLength: new FormControl('', Validators.required),
  });

  sketchLeg = (p: any) => {
    const pict = p;
    const draftValues = {
      coordinateWaist: null,
      coordinateKnee: null,
      coordinateFootOnGround: null,
      footPixel: null,
      isShouldDraw: false,
    };
    pict.passValue = (value) => {
      draftValues.isShouldDraw = false;
      draftValues.isShouldDraw = !Object.values(value).some((v) => ((v === 0) || (v === null)));
      Object.assign(draftValues, value);
    };
    pict.draw = () => {
      if (draftValues.isShouldDraw) {
        pict.stroke(20, 233, 36);
        pict.strokeWeight(3);
        pict.line(draftValues.coordinateWaist.x, draftValues.coordinateWaist.y,
          draftValues.coordinateKnee.x, draftValues.coordinateKnee.y);
        pict.line(draftValues.coordinateKnee.x, draftValues.coordinateKnee.y,
          draftValues.coordinateFootOnGround.x, draftValues.coordinateFootOnGround.y);
        pict.line(draftValues.coordinateFootOnGround.x, draftValues.coordinateFootOnGround.y,
          draftValues.coordinateFootOnGround.x + draftValues.footPixel,
          draftValues.coordinateFootOnGround.y);
      } else {
        console.log('check your data');
      }
    };
  }

  sketchTorsAndArm = (p: any) => {
    const pict = p;
    const draftValues = {
      coordinateWaist: { x: null, y: null },
      coordinatePalmCenter: { x: null, y: null },
      coordinateShoulder: { x: null, y: null },
      isShouldDraw: false,
    };
    pict.passValue = (value) => {
      draftValues.isShouldDraw = false;
      draftValues.isShouldDraw = !Object.values(value).some((v) => (v === null || isNaN(v.x)
        || isNaN(v.y)));
      Object.assign(draftValues, value);
    };
    pict.draw = () => {
      if (draftValues.isShouldDraw) {
        pict.stroke(248, 93, 10);
        pict.strokeWeight(3);
        pict.line(draftValues.coordinateWaist.x, draftValues.coordinateWaist.y,
          draftValues.coordinateShoulder.x, draftValues.coordinateShoulder.y);
        pict.line(draftValues.coordinatePalmCenter.x, draftValues.coordinatePalmCenter.y,
          draftValues.coordinateShoulder.x, draftValues.coordinateShoulder.y);
      } else {
        console.log('check your data');
      }
    };
  }

  getImgUrl() {
    return (
      (
        this.dataForm
        && this.dataForm.value
        && this.dataForm.value.motocycle
        && this.dataForm.value.motocycle.urlImg
      )
      || ''
    );
  }

  getHeightSaddle() {
    return (
      (
        this.dataForm
        && this.dataForm.value
        && this.dataForm.value.motocycle
        && this.dataForm.value.motocycle.heightSaddle
      )
      || null
    );
  }

  getScale() {
    return (
      (
        this.dataForm
        && this.dataForm.value
        && this.dataForm.value.motocycle
        && this.dataForm.value.motocycle.scale
      )
      || null
    );
  }

  getCoordinatesCenterSaddle() {
    return (
      (
        this.dataForm
        && this.dataForm.value
        && this.dataForm.value.motocycle
        && this.dataForm.value.motocycle.coordinatesCenterSaddle
      )
      || null
    );
  }

  getCoordinatesCenterSaddleX() {
    return (
      (this.getCoordinatesCenterSaddle() && this.dataForm.value.motocycle.coordinatesCenterSaddle.x)
      || null
    );
  }

  getCoordinatesCenterSaddleY() {
    return (
      (this.getCoordinatesCenterSaddle() && this.dataForm.value.motocycle.coordinatesCenterSaddle.y)
      || null
    );
  }

  getHeightRider() {
    return (
      (this.dataForm && this.dataForm.value && this.dataForm.value.heightRider)
      || null
    );
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
    this.canvasTors.clear();
  }

  isHideCanvas() {
    return !this.getImgUrl();
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
    const xMedianCorner = Math.sqrt(Math.pow(waistToKneePixel, 2) - Math.pow(yInMiddle, 2));

    if (legPixel > heightSaddlePixel) {
      this.canvasLeg.passValue({
        xSaddle, ySaddle, xMedianCorner, yInMiddle, heightSaddlePixel, footPixel, isCorner: true,
      });
    }
    if (legPixel <= heightSaddlePixel) {
      this.canvasLeg.passValue({
        xSaddle, ySaddle, legPixel, footPixel, isCorner: false,
      });
    }

    this.canvasLeg.clear();
    this.canvasLeg.redraw();
  }
}
