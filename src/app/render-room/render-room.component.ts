import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RoomDataService } from "../services/room-data.service";
import { environment } from "../../environments/environment";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ChatService } from "../services/chat.service";
import { AuthService } from '../services/auth.service';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
import * as io from 'socket.io-client';
import reframe from 'reframe.js';
import { MessageService } from '../services/message.service';
import { interval } from 'rxjs';
import { retryWhen } from 'rxjs/operators';

@Component({
  selector: "app-render-room",
  templateUrl: "./render-room.component.html",
  styleUrls: ["./render-room.component.css"]
})
export class RenderRoomComponent implements OnInit {

  // @ViewChild('video') video: NgxY2PlayerComponent;
  // videoId: 'z8WdQsPknf0'; // string or string array;

  // playerOptions: NgxY2PlayerOptions = {
  //   height: 500, // you can set 'auto', it will use container width to set size
  //   width: 500,
  //   // when container resize, it will call resize function, you can custom this by set resizeDebounceTime, default is 200
  //   resizeDebounceTime: 0,
  //   playerVars: {
  //     autoplay: 1,
  //   },
  //   // aspectRatio: (3 / 4), // you can set ratio of aspect ratio to auto resize with
  // };
  private roomId: string;
  private title: string;
  private description: string;
  private category: string;
  private link: any;
  private dangerousVideoUrl: string;
  private username;
  private room;
  private clientId;
  private test;
  private id;
  private button;
  private sliderTime: number;
  private temp: string;
  messageText: String;
  messagePress = "pause";
  playerEvent: {
    state: string, time: number, sliderPosition: number
  };
  messageArray: Array<{ user: string, message: string }> = [];
  // eventsArray: Array<{ description: String, message2: String }> = [];

  private time: any;
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public sliderValue = 0;
  constructor(
    private route: ActivatedRoute,
    private roomDataService: RoomDataService,
    private sanitizer: DomSanitizer,
    private chatService: ChatService,
    private authService: AuthService,
    private msgService: MessageService

  ) { }

  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  check() {
    console.log(this.playerEvent.state)
    if (this.playerEvent.state === "pause") {
      this.go(this.playerEvent.time)
      this.pause();

    }
    if (this.playerEvent.state === "play") {
      console.log(this.go(this.playerEvent.time))
      this.play();
    }
    if (this.playerEvent.state === "change") {

      this.onSliderChange(this.playerEvent.time)
    }
      while(this.playerEvent.state === "undefined"){
      this.playerEvent.sliderPosition = this.getTimeElapsed()
    }
  }

  getTimeElapsed() {
    return this.player.getCurrentTime();
  }

  getVideoDuration() {
    return this.player.getDuration();

  }

  pause() {
    this.player.pauseVideo();
    this.sliderValue = this.playerEvent.sliderPosition
    console.log("Paused at" + " " + this.getTimeElapsed());
  }
  play() {
    this.player.playVideo();
    this.sliderValue = this.playerEvent.sliderPosition
    console.log("Played at" + " " + this.getTimeElapsed());

  }

  stop() {
    this.video.videoPlayer.stopVideo();
  }

  go(second) {
    this.sliderValue = this.playerEvent.sliderPosition
    console.log(this.getVideoDuration())
    this.player.seekTo(second, true);
  }

  followingSlider(){
    return this.getTimeElapsed()/this.getVideoDuration()*100;
  }
  

  onSliderChange(second){
    // let goTo = this.getVideoDuration() * (second / 100)
    // let goTo = this.getTimeElapsed()/this.getVideoDuration() * 100
    console.log(this.getTimeElapsed())
    this.player.seekTo(second, true);
  }

  join() {
    this.chatService.joinRoom({});
  }

  leave() {
    this.chatService.leaveRoom({ user: this.username, room: this.title });
  }

  sendMessage() {
    this.chatService.sendMessage({ user: this.username, room: this.title, message: this.messageText })
    this.messageText = "";
  }

  pressPause() {
    this.msgService.pressPause({ state: "pause", time: this.getTimeElapsed(), sliderPosition: this.sliderValue })
  }

  pressPlay() {
    this.msgService.pressPlay({ state: "play", time: this.getTimeElapsed(), sliderPosition: this.sliderValue })
  }

  sliderChange() {
    this.msgService.sliderChange({ state: "change", time: this.getVideoDuration() * (this.sliderValue / 100), sliderPosition: this.sliderValue })
  }

  ngOnInit() {
    this.init();

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: "5ha_N-NNAm4",
        playerVars: {
          'controls': 0,
          'disabledkb': 1,
          'modestbranding': 1,
          'showinfo': 0
        },
        events: {
          // 'onStateChange': this.onPlayerStateChange.bind(this),
          // 'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              reframe(e.target.a);
            }
          }
        }

      });
    };


    this.route.params.subscribe(data => {
      // console.log(data)
      //this.id = data.id;
      this.roomId = data.id;
      console.log(this.roomId);
      // this.categoryId = data.categoryId;
    });

    this.msgService.pressedPause()
      .subscribe(data => {
        this.playerEvent = ({
          "state": data.state,
          "time": data.time,
          "sliderPosition": data.sliderPosition
        });
        this.temp = data.state

        console.log(this.temp)
        this.check()
          ,
          err => {
            console.log(err);
            //closeLoadingBar();
          },
          () => {
            console.log("subscribe completed")
          }
      });

    this.msgService.pressedPlay()
      .subscribe(data => {
        this.playerEvent = ({
          "state": data.state,
          "time": data.time,
          "sliderPosition": data.sliderPosition
        });
        this.temp = data.state

        console.log(this.temp)
        this.check()
          ,
          err => {
            console.log(err);
            //closeLoadingBar();
          },
          () => {
            console.log("subscribe completed")
          }
      });

    this.msgService.changedSlider()
      .subscribe(data => {
        this.playerEvent = ({
          "state": data.state,
          "time": data.time,
          "sliderPosition": data.sliderPosition
        });
        this.temp = data.state

        console.log(this.temp)
        this.check()
          ,
          err => {
            console.log(err);
            //closeLoadingBar();
          },
          () => {
            console.log("subscribe completed")
          }
      });


    console.log(this.roomId);

    this.link = "";
    this.roomDataService.getRoomById(this.roomId)
      .subscribe(data => {
        this.authService.getClient()
          .pipe(retryWhen(_ => {
            return interval(3000)
          }))
          .subscribe(client => {
            this.username = client["username"];
            console.log(this.username);

            console.log(data);
            console.log(data["link"])
            this.title = data["title"];
            this.link = data["link"];
            // data['link'] = this.link.replace("watch?v=", "embed")
            data['link'] = this.link.replace("watch?v=", "embed/");
            this.link = this.sanitizer.bypassSecurityTrustResourceUrl(data["link"]);
            this.link = data['link'].substring(data['link'].indexOf("d/") + 2, data['link'].length);
            console.log("something else" + " " + this.link)
            this.clientId = data["clientId"];
            this.description = data["description"];
            this.category = data["category"];
            console.log("this - " + this.username + " this - " + this.title);
            this.chatService.joinRoom({ user: this.username, room: this.title })
          });
      });

    this.chatService.userJoinedRoom().subscribe(data => this.messageArray.push(data))
    // this.chatService.userLeftRoom().subscribe(data => this.messageArray.push(data))
    this.chatService.newMessageReceived().subscribe(data => this.messageArray.push(data))
    // this.chatService.newButtonPressed().subscribe(data => this.messageArray.push(data))
  }


}
