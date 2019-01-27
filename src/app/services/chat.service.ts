import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()

export class ChatService {
    private socket = io("http://localhost:3000");

    joinRoom(data)
    {
        this.socket.emit("join", data)
    }

    userJoinedRoom(){
        let observable = new Observable<{user: string, message: string}> (observer => {
            this.socket.on('new user joined' , (data) => {
                observer.next(data);
            })
            return () => {this.socket.disconnect();}
        })
        return observable;
    }

    leaveRoom(data)
    {
        this.socket.emit("leave", data)
    }

    userLeftRoom(){
        let observable = new Observable<{description: string, message: string}> (observer => {
            this.socket.on('left room' , (data) => {
                observer.next(data);
            })
            return () => {this.socket.disconnect();}
        })
        return observable;
    }

    sendMessage(data) {
        this.socket.emit('message', data)
    }

    
    newMessageReceived() {
        console.log("Hello from outside")
        
        let observable = new Observable<{user: string, message: string}> (observer => {
            this.socket.on('new message', (data) => {
                console.log("Hello from inside " + data.user)
                observer.next(data);
            })
            return () => {this.socket.disconnect();}
        })
        return observable;
    } 
    
    // newButtonPressed() {
    //     let observable = new Observable<{description: String, message2: String}> (observer => {
    //         this.socket.on('press pause', (data) => {
    //             observer.next(data);
    //         })
    //         return () => {this.socket.disconnect();}
    //     })
    //     return observable;
    // }

}
