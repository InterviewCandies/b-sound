import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsCollectionComponent } from './sounds-collection.component';

describe('SoundsCollectionComponent', () => {
  let component: SoundsCollectionComponent;
  let fixture: ComponentFixture<SoundsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundsCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
