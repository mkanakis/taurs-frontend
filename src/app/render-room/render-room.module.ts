import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from '../services/chat.service'
import { MessageService } from '../services/message.service';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule
  ],
  providers: [ChatService, MessageService],
})
export class RenderRoomModule { }
