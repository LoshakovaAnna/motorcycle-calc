import { Component } from '@angular/core';
import {
  FormGroup, FormControl, Validators, AbstractControl,
} from '@angular/forms';
import * as p5 from 'p5';

import { MotorcycleModel } from '../shared/motorcycle.model';
import { CoordinateModel } from '../shared/coordinate.model';
import { RiderModel } from '../shared/rider.model';
import { MOCK } from '../shared/mockdata';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../shared/canvas.config';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})

export class CalculatorComponent {
  constructor() {
    this.motocycles = MOCK.models;
    this.riderValues = this.initializationRider();
    this.canvas = new p5(this.sketch, 'canvas-human');
    this.canvas.setup = () => {
      this.canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).position(0, 0);
      this.canvas.noLoop();
    };
  }

  canvas: p5;

  riderValues: RiderModel;

  motocycles: MotorcycleModel[];

  dataForm = new FormGroup({
    motocycle: new FormControl('', Validators.required),
    heightRider: new FormControl('', [Validators.required, this.validatorHeightRider]),
  });

  initializationRider = () => {
    const newRiderValues = {
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
    return newRiderValues;
  }

  validatorHeightRider(control: AbstractControl) {
    if ((Number(control.value) < 100) || (Number(control.value) > 250)) {
      return {
        isError: true,
      };
    }
    return null;
  }

  sketch = (p: p5) => {
    const pict = p;
    const draftValues = {
      coordinateWaist: {
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
      coordinateKnee: {
        x: null,
        y: null,
      },
      coordinateFootOnGround: {
        x: null,
        y: null,
      },
      footPixel: null,
      isShouldDraw: false,
    };
    pict.passValue = (value) => {
      draftValues.isShouldDraw = false;
      draftValues.isShouldDraw = !Object.values(value).some((v) => ((v === 0) || (v === null))); //
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

        pict.stroke(248, 93, 10);
        pict.line(draftValues.coordinateWaist.x, draftValues.coordinateWaist.y,
          draftValues.coordinateShoulder.x, draftValues.coordinateShoulder.y);
        pict.line(draftValues.coordinatePalmCenter.x, draftValues.coordinatePalmCenter.y,
          draftValues.coordinateShoulder.x, draftValues.coordinateShoulder.y);
      } else {
        console.log('sketch: check your data');
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

  getCoordinatesHandlebar() {
    return (
      (
        this.dataForm
        && this.dataForm.value
        && this.dataForm.value.motocycle
        && this.dataForm.value.motocycle.coordinatesHandlebar
      )
      || null);
  }

  onChangeInputHeightRider() {
    console.log(this.dataForm.controls.heightRider.value);
  }

  onChangeInputLegLength() {
    console.log(this.dataForm.controls.legLength.value);
  }

  onChangeSelectMoto() {
    console.log(this.dataForm.controls.motocycle.value);
    this.canvas.clear();
  }

  isHideCanvas() {
    return !this.getImgUrl();
  }

  calculateRiderValues(rider: RiderModel, scale, heightRider, heightSaddle: number) {
    const heightSaddlePixel = (scale * heightSaddle) / 10; // cm
    let newRiderValues = this.initializationRider();
    Object.assign(newRiderValues, rider);
    newRiderValues = this.calculateLengthsRiderBodyParts(newRiderValues, scale, heightRider);
    newRiderValues = this.calculateCoordinatesRiderBodyParts(newRiderValues, heightSaddlePixel);
    return newRiderValues;
  }

  calculateLengthsRiderBodyParts(riderValues: RiderModel, scale, heightRider: number) {
    const newRiderValues = this.initializationRider();
    Object.assign(newRiderValues, riderValues);
    newRiderValues.height = heightRider;
    newRiderValues.heightRiderPixel = scale * newRiderValues.height;
    newRiderValues.headPixel = newRiderValues.heightRiderPixel / 8;
    newRiderValues.neckPixel = newRiderValues.heightRiderPixel * 0.03;
    newRiderValues.torsPixel = newRiderValues.headPixel * 3 - newRiderValues.neckPixel;
    newRiderValues.palmPixel = newRiderValues.heightRiderPixel * 0.09;
    newRiderValues.armPixel = newRiderValues.heightRiderPixel * 0.1875
      + newRiderValues.heightRiderPixel / 7
      + newRiderValues.palmPixel / 2;
    newRiderValues.legPixel = newRiderValues.heightRiderPixel / 2;
    newRiderValues.waistToKneePixel = newRiderValues.legPixel / 2;
    newRiderValues.kneeToFootPixel = newRiderValues.legPixel / 2;
    newRiderValues.footPixel = newRiderValues.heightRiderPixel / 7;
    return newRiderValues;
  }

  calculateCoordinatesRiderBodyParts(riderValues: RiderModel, heightSaddlePixel: number) {
    const newRiderValues = this.initializationRider();
    Object.assign(newRiderValues, riderValues);
    newRiderValues.coordinateWaist = this.getCoordinatesCenterSaddle();
    newRiderValues.coordinateKnee = this.calculateCoordinateKnee(
      newRiderValues.coordinateWaist, heightSaddlePixel, newRiderValues.legPixel,
      newRiderValues.waistToKneePixel,
    );
    newRiderValues.coordinateFootOnGround = this.calculateCoordinateFootOnGround(
      heightSaddlePixel, newRiderValues.legPixel,
    );
    newRiderValues.coordinatePalmCenter = this.getCoordinatesHandlebar();
    newRiderValues.coordinateShoulder = this.calculateCoordinateThirdCornerOfTriangle(
      newRiderValues.coordinateWaist, newRiderValues.coordinatePalmCenter,
      newRiderValues.torsPixel, newRiderValues.armPixel,
    );
    return newRiderValues;
  }

  calculateCoordinateKnee(coordinateWaist: CoordinateModel, heightSaddlePixel, legPixel,
                          waistToKneePixel: number) {
    if (coordinateWaist === null) {
      return null;
    }
    const coordinateKnee = {
      x: null,
      y: null,
    };
    if (legPixel > heightSaddlePixel) {
      coordinateKnee.x = Math.sqrt(
        Math.pow(waistToKneePixel, 2)
        - Math.pow((heightSaddlePixel / 2), 2),
      )
        + coordinateWaist.x;
    } else {
      coordinateKnee.x = coordinateWaist.x;
    }
    coordinateKnee.y = (heightSaddlePixel / 2) + coordinateWaist.y;
    return coordinateKnee;
  }

  calculateCoordinateFootOnGround(heightSaddlePixel, legPixel: number) {
    if (legPixel > heightSaddlePixel) {
      return {
        x: this.getCoordinatesCenterSaddleX(),
        y: this.getCoordinatesCenterSaddleY() + heightSaddlePixel,
      };
    }
    return {
      x: this.getCoordinatesCenterSaddleX(),
      y: this.getCoordinatesCenterSaddleY() + legPixel,
    };
  }

  calculateLengthBetweenTwoPoints = (A, B: CoordinateModel) => {
    if (A === null || B === null) {
      return null;
    }
    return Math.sqrt(Math.pow((B.x - A.x), 2) + Math.pow(B.y - A.y, 2));
  }

  calculateCoordinateThirdCornerOfTriangle(coordinateFirstCorner: CoordinateModel,
                                           coordinateSecondCorner: CoordinateModel, lenghtFirstSide, lenghtSecondSide: number) {
    if (
      coordinateFirstCorner === null
      || coordinateSecondCorner === null
      || lenghtFirstSide === null
      || lenghtSecondSide === null
    ) {
      return null;
    }
    const lenghtThirdSide = this.calculateLengthBetweenTwoPoints(
      coordinateFirstCorner, coordinateSecondCorner,
    );
    const segmentThirdSideDividedByHeight = (
      Math.pow(lenghtFirstSide, 2)
      - Math.pow(lenghtSecondSide, 2)
      + Math.pow(lenghtThirdSide, 2)
    )
      / (lenghtThirdSide * 2);
    const heightOfThirdCorner = Math.sqrt(
      Math.pow(lenghtFirstSide, 2)
      - Math.pow(segmentThirdSideDividedByHeight, 2),
    );
    const pointThirdSideDividedByHeight = { x: null, y: null };
    pointThirdSideDividedByHeight.x = coordinateFirstCorner.x
      + (
        (segmentThirdSideDividedByHeight / lenghtThirdSide)
        * (coordinateSecondCorner.x - coordinateFirstCorner.x)
      );
    pointThirdSideDividedByHeight.y = coordinateFirstCorner.y
      + (
        (segmentThirdSideDividedByHeight / lenghtThirdSide)
        * (coordinateSecondCorner.y - coordinateFirstCorner.y)
      );
    const coordinateThirdCorner = { x: null, y: null };
    coordinateThirdCorner.x = pointThirdSideDividedByHeight.x
      + (
        (heightOfThirdCorner / lenghtThirdSide)
        * (coordinateSecondCorner.y - coordinateFirstCorner.y)
      );
    coordinateThirdCorner.y = pointThirdSideDividedByHeight.y
      - (
        (heightOfThirdCorner / lenghtThirdSide)
        * (coordinateSecondCorner.x - coordinateFirstCorner.x)
      );
    return coordinateThirdCorner;
  }

  showRider() {
    const scale = this.getScale();
    const heightRider = this.getHeightRider();
    const heightSaddle = this.getHeightSaddle();
    this.riderValues = this.calculateRiderValues(
      this.riderValues, scale, heightRider, heightSaddle,
    );
    this.drawRider(this.riderValues, this.canvas);
  }

  drawRider(rider: RiderModel, canvas: p5) {
    const {
      coordinatePalmCenter,
      coordinateShoulder,
      coordinateWaist,
      coordinateKnee,
      coordinateFootOnGround,
      footPixel,
    } = rider;
    canvas.passValue({
      coordinatePalmCenter,
      coordinateShoulder,
      coordinateWaist,
      coordinateKnee,
      coordinateFootOnGround,
      footPixel,
    });
    canvas.clear();
    canvas.redraw();
  }
}
