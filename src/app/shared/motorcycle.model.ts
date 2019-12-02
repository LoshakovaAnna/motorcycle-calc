import { CoordinateModel } from './coordinate.model';

export interface MotorcycleModel {
  name: string;
  urlImg: string;
  heightSaddle: number;
  scale: number;
  coordinateCenterSaddle: CoordinateModel;
  coordinateHandlebar: CoordinateModel;
  coordinatePedal: CoordinateModel;
}
