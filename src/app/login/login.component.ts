import { Component, OnInit } from '@angular/core';
import { RoomDataService } from '../services/room-data.service';
import { AuthService } from '../services/auth.service';
import { RoomCardComponent } from '../room-card/room-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) 
  { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate([RoomCardComponent]);
    }
  }

  login() {
    const postData = {
      email: this.email,
      password: this.password
    }

    this.authService.login(postData).subscribe( data => {
      console.log(data);
      this.authService.setSession(data);
      this.router.navigate([RoomCardComponent]);
    })
  }
}
