import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import {By} from "@angular/platform-browser";

import { CalculatorComponent } from './calculator.component';
import { HttpLoaderFactory } from '../app.module';

describe('CalculatorComponent', () => {
  const ENGLISH_TRANSLATIONS = require('../../assets/i18n/en.json');
  const RUSIAN_TRANSLATIONS = require('../../assets/i18n/ru.json');
  const motoModel = {
    name: 'Suzuki B-King (GSX 1300 BK)',
    urlImg: 'https://bikeswiki.ru/images/a/a3/2008_B-KING_au1_800.jpg',
    heightSaddle: 805,
    scale: 3.37,
    coordinateCenterSaddle: {
      x: 330,
      y: 405,
    },
    coordinateHandlebar: {
      x: 532,
      y: 333,
    },
    coordinatePedal: {
      x: 320,
      y: 568,
    },
  };
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let translate: TranslateService;
  let debugElement: DebugElement;
  let htmlElForm: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      declarations: [CalculatorComponent],
    })
      .compileComponents();

  }));

  beforeEach(() => {
    translate = TestBed.get(TranslateService);
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElForm = debugElement.query(By.css('form')).nativeElement;
    translate.setTranslation('ru', RUSIAN_TRANSLATIONS);
    translate.setTranslation('en', ENGLISH_TRANSLATIONS);
    fixture.detectChanges();
  });

  it('should create calc comp', () => {
    expect(component).toBeTruthy();
  });

  it('should check russian language label', () => {
    translate.use('ru');
    fixture.detectChanges();
    expect(debugElement.nativeElement.querySelector('#moto-label').innerHTML)
      .toEqual(RUSIAN_TRANSLATIONS['moto-label']);
  });

  it('should check english language label', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(debugElement.nativeElement.querySelector('#moto-label').innerHTML)
      .toEqual(ENGLISH_TRANSLATIONS['moto-label']);
  });

  it('should create new object of rider with initial values', () => {
    const newRider = {
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
      coordinateKneePositionGround: {
        x: null,
        y: null,
      },
      coordinateKneePositionPedal: {
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
      coordinateNeck: {
        x: null,
        y: null,
      },
      coordinateCenterHead: {
        x: null,
        y: null,
      },
    };
    expect(component.initializationRider()).toEqual(newRider);
    expect(component.initializationRider()).not.toBeNull();
  });

  describe('test form', () => {
    it('form should be invalid. empty inputs', () => {
      component.dataForm.controls['motocycle'].setValue('');
      component.dataForm.controls['heightRider'].setValue('');
      component.dataForm.controls['isPositionFootOnGround'].setValue('');
      expect(component.dataForm.valid).toBeFalsy();
    });
    it('form should be invalid. check heightRider >220', () => {
      component.dataForm.controls['motocycle'].setValue(motoModel);
      component.dataForm.controls['heightRider'].setValue(221);
      expect(component.dataForm.valid).toBeFalsy();
    });
    it('form should be invalid. check heightRider <140', () => {
      component.dataForm.controls['motocycle'].setValue(motoModel);
      component.dataForm.controls['heightRider'].setValue(139);
      expect(component.dataForm.valid).toBeFalsy();
    });
    it('form should be valid', () => {
      component.dataForm.controls['motocycle'].setValue(motoModel);
      component.dataForm.controls['heightRider'].setValue('200');
      expect(component.dataForm.valid).toBeTruthy();
    });
    it('button should  be disabled in the beginning', () => {
      const nativ = fixture.debugElement.nativeElement;
      const b = nativ.querySelector('#btn-show-rider');
      expect(b.disabled).toBeTruthy();
    });
    it('button should  be able  when form valid', () => {
      component.dataForm.controls['motocycle'].setValue(motoModel);
      component.dataForm.controls['heightRider'].setValue('200');
      fixture.detectChanges();
      const nativ = fixture.debugElement.nativeElement;
      const b = nativ.querySelector('#btn-show-rider');
      console.log(b.disabled)
      expect(b.disabled).toBeFalsy();
    });
  });



  describe('test calculation ', () => {
    it('two point, toEqual(3)', () => {
      const A = {x:1, y:1};
      const B = {x:4, y:1};
      expect(component.calculateLengthBetweenTwoPoints(A, B)).toEqual(3);
    });
    it('two point toEqual(19)', () => {
      const A = {x:4, y:0};
      const B = {x:-15, y:0};
      expect(component.calculateLengthBetweenTwoPoints(A, B)).toEqual(19);
    });
    it('two point toBeNull()', () => {
      const A = {x:-1, y:-1};
      const B = null;
      expect(component.calculateLengthBetweenTwoPoints(A, B)).toBeNull();
    });
  });
});
