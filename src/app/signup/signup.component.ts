import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RoomCardComponent } from '../room-card/room-card.component';
import {MatSnackBar} from "@angular/material"
import { environment } from '../../environments/environment';
import { LoginComponent } from '../login/login.component';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
// import { PasswordValidation } from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupData: FormGroup;
  private readonly url = `${environment.api_url}/login`;
  private email: string;
  private password: string;
  private username: string;
  private confirmPassword: string;

  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private fb: FormBuilder) {
    if (authService.isLoggedIn()) {
      this.router.navigate([RoomCardComponent]);
    }
    this.signupData = this.createSignupForm();
  }

  ngOnInit() {
    // this.signupData = new FormGroup ({
    //   email: [null, Validators.compose([
    //     Validators.required, 
    //     Validators.email])
    //   ],
    //   username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    //   confirmPassword: new FormControl('', [Validators.required])
    // },
    // {validators: this.passwordMatchValidator }
    // );

  }


  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        // email is required and must be a valid email email
        email: [null, Validators.compose([
          Validators.email,
          Validators.required])
        ],
        username: [null, Validators.compose([
          Validators.required,
          Validators.minLength(5)])
        ],
        password: [null, Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          Validators.minLength(5)])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: SignupComponent.passwordMatchValidator
      });
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.signupData.controls[controlName].hasError(errorName);
  }

  createUser = (userFormValue) => {
    if (this.signupData.valid) {
      this.signup(this.signupData);
    }
  }
  

  signup(data: FormGroup) {
    console.log('Ciao'+data.get('email').value);
    const postData = {
      realm: 'string',
      emailVerified: false,
      email: data.get('email').value,
      password: data.get('password').value,
      username: data.get('username').value
    }
    

    this.authService.signup(postData).subscribe( data => {
      this.snackBar.open("Sign up completed, please login", "Close");
      this.router.navigateByUrl("/login");
    }, (err) => {
      console.log(err);
      this.snackBar.open("Sign up error " + err.error.error.details.messages.title[0], 'Close')
    })
    
  }

}
