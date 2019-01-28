import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RoomDataService } from '../services/room-data.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Room } from '../common/room';
import { retryWhen } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  public rooms: any;
  private categories: any;
  private catName: any;
  private roomLinks: any;
  private link: any;
  private videoId: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private roomService: RoomDataService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private location: Location,
    private dialog: MatDialog
  ) 
  { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.getClientRooms()
        .subscribe((rooms) => {
          this.categoryService.getCategories()
            .pipe(retryWhen(_ => {
              return interval(3000);
            }))
            .subscribe((categories) => {
              let map = new Map();
              this.categories = categories;
              for (let i = 0; i < this.categories.length; i++) {
                map.set(this.categories[i]['id'], this.categories[i]['categoryName']);
              }
              this.catName = map;
              this.rooms = rooms;
              let roomsMap = new Map();
              this.roomLinks = rooms;
              for (let i = 0; i < this.roomLinks.length; i++) {
                roomsMap.set(this.roomLinks[i]['id'], this.roomLinks[i]['link']);
              }
              this.link = roomsMap;
              console.log(roomsMap)
              console.log(rooms);
            },
              err => {
                console.log('Oops:', err.message);

              },
              () => {
                console.log('We\'re done here');
              });
        },
          err => {
            console.log('Oops:', err.message);

          },
          () => {
            console.log('We\'re done here');
          });
    }
  }

  getValueFromMap(id) {
    return this.catName.get(id);
  }

  getLinkFromRoomsMap(id) {
    let link = this.link.get(id);
    this.videoId = link.substring(link.indexOf("=")+1, link.length);
    return this.videoId;
  }

  openEditDialog(room: Room) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = 900;
    dialogConfig.maxWidth = 900;
    dialogConfig.minHeight = 400;
    dialogConfig.maxWidth = 700;

    console.log(room);
    dialogConfig.data = {
      title: room.title,
      description: room.description,
      link: room.link,
      categories: this.categories
    }

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log('Dialog output: ', res);
        
        room.title = res.title;
        room.description = res.description;
        room.categoryId = res.categoryId;
        room.link = res.link;
        
        this.updateRoomFields(room.id, room);
      })
  }

  updateRoomFields(id: string, data: Room) {
    this.roomService.updateRoom(data.id, data)
      .subscribe((room) => {
        console.log('Room updated successfully ' + room);
      })
  }

  delete(id: string) {
    console.log(id);
    this.roomService.deleteRoomWithId(id)
      .subscribe((room) => {
        console.log('Room delete successfully ' + room);
      });
      window.location.reload();
  }
}
