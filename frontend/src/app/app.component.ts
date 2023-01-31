import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public myForm: FormGroup;
  public password = '';
  public digits = /\d/;
  public letters = /[a-zA-Z]/;
  public symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  public strength: string;
  public bar0: string;
  public bar1: string;
  public bar2: string;


  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      password: [this.password]
    });

    this.myForm.controls['password'].valueChanges.subscribe(value => {
      if (value.length == 0) {
        this.bar0 = '';
        this.bar1 = '';
        this.bar2 = '';
        this.strength = 'enter your password';
      } else if (value.length < 8 && value.length > 0) {
        this.bar0 = 'red';
        this.bar1 = 'red';
        this.bar2 = 'red';
        this.strength = 'invalid';
      } else if (this.checkOnStrong(value)) {
        this.bar0 = 'green';
        this.bar1 = 'green';
        this.bar2 = 'green';
        this.strength = 'strong';
      } else if (this.checkOnMedium(value)) {
        this.bar0 = 'yellow';
        this.bar1 = 'yellow';
        this.bar2 = '';
        this.strength = 'medium';
      } else if (this.checkOnEasy(value)) {
        this.bar0 = 'red';
        this.bar1 = '';
        this.bar2 = '';
        this.strength = 'easy';
      }
    });
  }


  public checkOnEasy(e: any) {
    return this.digits.test(e) || this.symbols.test(e) || this.letters.test(e)
  }

  public checkOnMedium(e: any) {
    return (this.digits.test(e) && this.symbols.test(e))
      || ( this.letters.test(e) && this.symbols.test(e))
      || ( this.letters.test(e) && this.digits.test(e))
  }

  public checkOnStrong(e: any) {
    return this.digits.test(e) && this.symbols.test(e) &&  this.letters.test(e);
  }

}
