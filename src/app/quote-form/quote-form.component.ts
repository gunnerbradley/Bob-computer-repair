import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
})
export class QuoteFormComponent implements OnInit {
  servicesForm: FormGroup;
  totalCost: number = 0.0;
  chosenServices = [];

  services = {
    serviceOptions: [
      { name: 'Password Reset', id: 'password-reset', value: 39.99 },
      { name: 'Spyware Removal', id: 'spyware-removal', value: 99.99 },
      { name: 'RAM Upgrade', id: 'ram-upgrade', value: 129.99 },
      { name: 'Software Installation', id: 'software-install', value: 49.99 },
      { name: 'Tune-Up', id: 'tune-up', value: 89.99 },
      { name: 'Keyboard Cleaning', id: 'keyboard-cleaning', value: 45.0 },
      { name: 'Disk Clean-up', id: 'disk-clean-up', value: 149.0 },
    ],
    standardService: [
      {
        name: 'Parts',
        value: 0.0,
        id: 'parts',
        hint: 'Enter total amount ($)',
      },
      { name: 'Labor', value: 0, id: 'labor', hint: '$50/hr' },
    ],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.servicesForm = this.formBuilder.group({
      selectedServices: new FormArray([]),
    });
  }

  onChange(event: any) {
    const selectedServices = this.servicesForm.controls
      .selectedServices as FormArray;

    if (event.target.checked && event.target.id !== 'labor') {
      selectedServices.push(
        new FormControl({ name: event.target.name, cost: event.target.value })
      );
    } else if (event.target.value && event.target.id !== 'labor') {
      selectedServices.push(
        new FormControl({ name: event.target.name, cost: event.target.value })
      );
    } else if (event.target.value && event.target.id == 'labor') {
      selectedServices.push(
        new FormControl({
          name: event.target.name,
          cost: event.target.value * 50,
        })
      ); //hourly rate set here
    } else {
      const index = selectedServices.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedServices.removeAt(index);
    }
  }

  submit() {
    let serviceFees: number = 0;
    this.chosenServices = this.servicesForm.value.selectedServices;

    this.chosenServices.forEach((e: any) => {
      let cost = e.cost;
      let parsedNum = parseFloat(cost);

      serviceFees += parsedNum;
    });
    this.totalCost = serviceFees;

    return;
  }
}
