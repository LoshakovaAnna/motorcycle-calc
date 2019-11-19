import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})

export class CalculatorComponent {
  dataForm = new FormGroup({
    heightRider: new FormControl('', Validators.required),
    legLength: new FormControl('', Validators.required),
  });

  onChangeInputHeightRider() {
    console.log(this.dataForm.controls.heightRider.value);
  }

  onChangeInputLegLength() {
    console.log(this.dataForm.controls.legLength.value);
  }
}
