import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  dataForm =  new FormGroup({
    heighRider : new FormControl('', Validators.required),
    legLength:  new FormControl('', Validators.required)
  });

  constructor() { }

  onChangeInputHeighRider() {
    console.log(this.dataForm.controls.heighRider.value);
  }
  onChangeInputLegLength() {
    console.log(this.dataForm.controls.legLength.value);
  }
  ngOnInit() {
  }

}
