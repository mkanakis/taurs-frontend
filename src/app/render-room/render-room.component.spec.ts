import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderRoomComponent } from './render-room.component';

describe('RenderRoomComponent', () => {
  let component: RenderRoomComponent;
  let fixture: ComponentFixture<RenderRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
