import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private socket = io("http://localhost:3000");

  pressPause(data) {
    this.socket.emit("playerPause", data);
  }

  pressPlay(data) {
    this.socket.emit("playerPlay", data);
  }

  sliderChange(data) {
    this.socket.emit("sliderChange", data);
  }

  pressedPause() {
    let observable = new Observable<{ state: string; time: number, sliderPosition: number }>(
      observer => {
        this.socket.on("player pause", data => {
          console.log("called inside");
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  pressedPlay() {
    let observable = new Observable<{ state: string; time: number, sliderPosition: number }>(
      observer => {
        this.socket.on("player play", data => {
          console.log("called inside");
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  changedSlider() {
    let observable = new Observable<{ state: string; time: number, sliderPosition: number }>(
      observer => {
        this.socket.on("slider change", data => {
          console.log("called inside");
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
}
