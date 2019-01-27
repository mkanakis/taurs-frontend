import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RoomCardComponent } from './room-card/room-card.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FlexLayoutModule} from '@angular/flex-layout'
import {HttpClientModule} from '@angular/common/http'
import { RoomDataService } from './services/room-data.service';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RenderRoomComponent } from './render-room/render-room.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { ChatService } from './services/chat.service';
import { SignupComponent } from './signup/signup.component';
import { CategoryService } from './services/category.service';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { NgxY2PlayerModule } from 'ngx-y2-player';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { EditRoomModule } from './edit-room/edit-room.module';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    RoomCardComponent,
    CreateRoomComponent,
    RenderRoomComponent,
    LoginComponent,
    SignupComponent,
    EditRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    YoutubePlayerModule,
    NgxY2PlayerModule,
    EditRoomModule
  ],
  exports: [EditRoomComponent],
  providers: [RoomDataService, AuthService, AuthGuard, ChatService, CategoryService, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
