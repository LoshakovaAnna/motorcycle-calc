import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as p5 from 'p5';

import { MotorcycleModel } from '../shared/motorcycle.model';
import { CoordinateModel } from '../shared/coordinate.model';
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
      this.canvasLeg.createCanvas(1000, 660).position(0, 0);
      this.canvasLeg.noLoop();
    };
    this.canvasTors = new p5(this.sketchTorsAndArm, 'canvas-human');
    this.canvasTors.setup = () => {
      this.canvasTors.createCanvas(1000, 660).position(0, 0);
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
        console.log('sketchLeg: check your data');
      }
    };
  }

  sketchTorsAndArm = (p: any) => {
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
    };
    let isShouldDraw = false;
    pict.passValue = (value) => {
      isShouldDraw = false;
      Object.assign(draftValues, value);
      isShouldDraw = !Object.values(draftValues).some((v) => {
        if (v === null) {
          return true;
        }
        if ((v.hasOwnProperty('x')) && isNaN(v.x)) {
          return true;
        }
        if ((v.hasOwnProperty('y')) && isNaN(v.y)) {
          return true;
        }
        return false;
      });
    };
    pict.draw = () => {
      if (isShouldDraw) {
        pict.stroke(248, 93, 10);
        pict.strokeWeight(3);
        pict.line(draftValues.coordinateWaist.x, draftValues.coordinateWaist.y,
          draftValues.coordinateShoulder.x, draftValues.coordinateShoulder.y);
        pict.line(draftValues.coordinatePalmCenter.x, draftValues.coordinatePalmCenter.y,
          draftValues.coordinateShoulder.x, draftValues.coordinateShoulder.y);
      } else {
        console.log('sketchTorsAndArm: check your data');
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
    this.canvasLeg.clear();
    this.canvasTors.clear();
  }

  isHideCanvas() {
    return !this.getImgUrl();
  }

  calculateRiderValues() {
    this.calculateLengthsRiderBodyParts();
    this.calculateCoordinatesRiderBodyParts();
    console.log('calcalated riderValues', this.riderValues);
  }

  calculateLengthsRiderBodyParts() {
    const scale = this.getScale();
    this.riderValues.height = this.getHeightRider();
    this.riderValues.heightRiderPixel = scale * this.riderValues.height;
    this.riderValues.headPixel = this.riderValues.heightRiderPixel / 8;
    this.riderValues.neckPixel = this.riderValues.heightRiderPixel * 0.03;
    this.riderValues.torsPixel = this.riderValues.headPixel * 3 - this.riderValues.neckPixel;
    this.riderValues.palmPixel = this.riderValues.heightRiderPixel * 0.09;
    this.riderValues.armPixel = this.riderValues.heightRiderPixel * 0.1875
      + this.riderValues.heightRiderPixel / 7
      + this.riderValues.palmPixel / 2;
    this.riderValues.legPixel = this.riderValues.heightRiderPixel / 2;
    this.riderValues.waistToKneePixel = this.riderValues.legPixel / 2;
    this.riderValues.kneeToFootPixel = this.riderValues.legPixel / 2;
    this.riderValues.footPixel = this.riderValues.heightRiderPixel / 7;
  }

  calculateCoordinatesRiderBodyParts() {
    const scale = this.getScale();
    const heightSaddle = this.getHeightSaddle();
    const hSaddlePixel = (scale * heightSaddle) / 10; // cm
    this.riderValues.coordinateWaist = this.getCoordinatesCenterSaddle();
    this.riderValues.coordinateKnee = this.calculateCoordinateKnee(hSaddlePixel);
    this.riderValues.coordinateFootOnGround = this.calculateCoordinateFootOnGround(hSaddlePixel);
    this.riderValues.coordinatePalmCenter = this.getCoordinatesHandlebar();
    this.riderValues.coordinateShoulder = this.calculateCoordinateThirdCornerOfTriangle(
      this.riderValues.coordinateWaist,
      this.riderValues.coordinatePalmCenter,
      this.riderValues.torsPixel, this.riderValues.armPixel,
    );
  }

  calculateCoordinateKnee(heightSaddlePixel: number) {
    if (this.riderValues.coordinateWaist === null) {
      return null;
    }
    const coordKnee = {
      x: null,
      y: null,
    };
    if (this.riderValues.legPixel > heightSaddlePixel) {
      coordKnee.x = Math.sqrt(
        Math.pow(this.riderValues.waistToKneePixel, 2)
        - Math.pow((heightSaddlePixel / 2), 2),
      )
        + this.riderValues.coordinateWaist.x;
    } else {
      coordKnee.x = this.riderValues.coordinateWaist.x;
    }
    coordKnee.y = (heightSaddlePixel / 2) + this.riderValues.coordinateWaist.y;
    return coordKnee;
  }

  calculateCoordinateFootOnGround(heightSaddlePixel: number) {
    if (this.riderValues.legPixel > heightSaddlePixel) {
      return {
        x: this.getCoordinatesCenterSaddleX(),
        y: this.getCoordinatesCenterSaddleY() + heightSaddlePixel,
      };
    }
    return {
      x: this.getCoordinatesCenterSaddleX(),
      y: this.getCoordinatesCenterSaddleY() + this.riderValues.legPixel,
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
    const lenghtThirdSide = this.calculateLengthBetweenTwoPoints(coordinateFirstCorner,
      coordinateSecondCorner);
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

  showHuman() {
    this.calculateRiderValues();
    this.showLeg();
    this.showArmAndTors();
  }

  showLeg() {
    const {
      coordinateWaist,
      coordinateKnee,
      coordinateFootOnGround,
      footPixel,
    } = this.riderValues;
    this.canvasLeg.passValue({
      coordinateWaist,
      coordinateKnee,
      coordinateFootOnGround,
      footPixel,
    });
    this.canvasLeg.clear();
    this.canvasLeg.redraw();
  }

  showArmAndTors() {
    const {
      coordinateWaist, coordinatePalmCenter, coordinateShoulder,
    } = this.riderValues;
    this.canvasTors.passValue({
      coordinateWaist, coordinatePalmCenter, coordinateShoulder,
    });
    this.canvasTors.clear();
    this.canvasTors.redraw();
  }
}
