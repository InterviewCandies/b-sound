import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundProducerComponent } from './sound-producer.component';

describe('SoundProducerComponent', () => {
  let component: SoundProducerComponent;
  let fixture: ComponentFixture<SoundProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundProducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
