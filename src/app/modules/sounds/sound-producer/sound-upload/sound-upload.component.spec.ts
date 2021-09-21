import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundUploadComponent } from './sound-upload.component';

describe('SoundUploadComponent', () => {
  let component: SoundUploadComponent;
  let fixture: ComponentFixture<SoundUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
