import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ChatService } from './services/chat.service';
import { RoomDataService } from './services/room-data.service';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'taurs-frontend';
  categories: any;
  isLoggedIn = false;

  constructor(private router: Router,
    private authService: AuthService,
    private roomDataService: RoomDataService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.roomDataService.getData(`${environment.api_url}/api/Categories`)
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  routeChanged() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogout() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout().subscribe(data => {
        // localStorage.removeItem("roomsAngularToken")
        this.authService.clearSession();
        this.router.navigateByUrl("/login");
      });
    }

  }

  toggleChange(event) {
    let toggle = event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if (event.value.some(item => item == toggle.value)) {
        group.value = [toggle.value];
      }
    }
  }

  isRoom() {
    if (this.router.url.includes('rooms')) {
      return true;
    } else {
      return false;
    }
  }

}
