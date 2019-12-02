import { CoordinateModel } from './coordinate.model';

export interface RiderModel {
  height: number;
  heightRiderPixel: number;
  headPixel: number;
  neckPixel: number;
  torsPixel: number;
  palmPixel: number;
  armPixel: number;
  legPixel: number;
  waistToKneePixel: number;
  kneeToFootPixel: number;
  footPixel: number;
  coordinatePalmCenter: CoordinateModel;
  coordinateShoulder: CoordinateModel;
  coordinateNeck: CoordinateModel;
  coordinateCenterHead: CoordinateModel;
  coordinateWaist: CoordinateModel;
  coordinateKneePositionGround: CoordinateModel;
  coordinateKneePositionPedal: CoordinateModel;
  coordinateFootOnGround: CoordinateModel;
}
