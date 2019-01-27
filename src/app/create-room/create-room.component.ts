import { Component, OnInit } from '@angular/core';
import { RoomDataService } from '../services/room-data.service';
import { environment } from "../../environments/environment"
import { MatSnackBar } from "@angular/material"
import { RoomCardComponent } from '../room-card/room-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { Room, PostRoom } from '../common/room';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  private categories: object;
  private title: string;
  private categoryId: string;
  private description: string;
  private link: any;
  private clientId: string;

  constructor(
    private roomDataService: RoomDataService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService) 
  { }

  ngOnInit() {
    this.clientId = this.authService.getClientId();

    // this.roomDataService.getData(`${environment.api_url}/api/Categories`)
    //   .subscribe(data => {
    //     this.categories = data;
    //   })
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
      });
    
  }

  createRoom() {
    // const postData = {
    //   clientId: this.clientId,
    //   title: this.title,
    //   category: this.categoryId,
    //   description: this.description,
    //   link: this.link
    // };
    var room: PostRoom = {
      clientId: this.clientId,
      categoryId: this.categoryId,
      title: this.title,
      description: this.description,
      link: this.link
    };

    this.roomDataService.createRoom(room)
      .subscribe(data => {
        this.snackBar.open('Room created successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate([RoomCardComponent]);
      }, (err) => {
        console.log(err);
        this.snackBar.open('Room' + err.error.error.details.messages.title[0], 'Close', {
          duration: 3000
        });
      });
    // const accessToken = this.authService.getAccessToken();

    // this.roomDataService.postData(`${environment.api_url}/api/rooms?access_token=${accessToken}`, postData)
    //   .subscribe(data => {
    //     this.snackBar.open("Room created succesfully", "Close");
    //     this.router.navigate([RoomCardComponent]);
    //   }, (err) => {
    //     console.log(err);
    //     this.snackBar.open("Room " + err.error.error.details.messages.title[0], 'Close')
    //   })
  }
}
