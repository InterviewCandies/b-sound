import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundOptionsComponent } from './sound-options.component';

describe('SoundOptionsComponent', () => {
  let component: SoundOptionsComponent;
  let fixture: ComponentFixture<SoundOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
