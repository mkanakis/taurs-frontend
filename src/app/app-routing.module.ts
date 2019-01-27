import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { RenderRoomComponent } from './render-room/render-room.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import {SignupComponent} from './signup/signup.component'
import { EditRoomComponent } from './edit-room/edit-room.component';

const routes: Routes = [
  {path: 'rooms', component: RoomCardComponent},
  {path: 'rooms/create', component: CreateRoomComponent, canActivate: [AuthGuard]},
  {path: 'rooms/edit', component: EditRoomComponent, canActivate: [AuthGuard]},
  {path: 'rooms/:id/view', component: RenderRoomComponent},
  {path: 'rooms/:categoryId', component: RoomCardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  //leave this last
   {path: '**', redirectTo: '/rooms'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
