import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { RoomDataService } from '../services/room-data.service'
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoryService} from '../services/category.service'

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input('categories') catname: any;
  public rooms;
  public isLoggedIn = false;
  private pageLength: number;
  private pageSize = 5;
  private clientId: string;
  private categories: any;
  //private catname: any;
  private roomId: string;
  private roomLinks: any;
  private videoId: any;
  private link: any;
  private catego: any;


  constructor(
    private roomDataService: RoomDataService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.clientId = this.authService.getClientId();
    }

    this.route.params.subscribe(params => {
      const term = params['categoryId'];
      if (term !== undefined ) {
        this.roomDataService.getData(`${environment.api_url}/api/Categories/${this.route.snapshot.paramMap.get('categoryId')}/rooms`)
          .subscribe(data => {
            this.rooms = data;
            let roomsMap = new Map();
            this.roomLinks = data;
            for (let i = 0; i < this.roomLinks.length; i++) {
              roomsMap.set(this.roomLinks[i]['id'], this.roomLinks[i]['link']);
            }
            this.link = roomsMap;
          });
      } else {
        this.roomDataService.getData(`${environment.api_url}/api/Rooms/`)
          .subscribe(data => {
            this.rooms = data;
            let roomsMap = new Map();
            this.roomLinks = data;
            for (let i = 0; i < this.roomLinks.length; i++) {
              roomsMap.set(this.roomLinks[i]['id'], this.roomLinks[i]['link']);
            }
            this.link = roomsMap;
          });
      }
    });    
    let map = new Map();
    
    this.categoryService.getCategories()
    .subscribe((categories) => {
      let map = new Map();
      this.categories = categories;
      for (let i = 0; i < this.categories.length; i++) {
        map.set(this.categories[i]['id'], this.categories[i]['categoryName']);
      }
      this.catego = map;
    });
    
    console.log(this.catego!==undefined)
  }

  ngOnChanges() {
  }

  getValueFromMap(id) {
    return this.catego.get(id);

  }

  getLinkFromRoomsMap(id) {
    let link = this.link.get(id);
    this.videoId = link.substring(link.indexOf("=") + 1, link.length);
    return this.videoId;
  }

}
