import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDataService } from '../services/room-data.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth.guard';
import { ChatService } from '../services/chat.service';
import { CategoryService } from '../services/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AppComponent } from '../app.component';
import { EditRoomComponent } from './edit-room.component';

@NgModule({
  declarations: [
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [EditDialogComponent],
  providers: [RoomDataService, AuthService, AuthGuard, ChatService, CategoryService ]
})
export class EditRoomModule { }
