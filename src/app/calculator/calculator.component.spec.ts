import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';

import { CalculatorComponent } from './calculator.component';
import { HttpLoaderFactory } from '../app.module';

describe('CalculatorComponent', () => {
  const ENGLISH_TRANSLATIONS = require('../../assets/i18n/en.json');
  const RUSIAN_TRANSLATIONS = require('../../assets/i18n/ru.json');

  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let translate: TranslateService;
  let debugElement: DebugElement;

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
    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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
});
