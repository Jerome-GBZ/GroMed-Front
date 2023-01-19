import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeTypeComponent } from './commande-type.component';

describe('CommandeTypeComponent', () => {
  let component: CommandeTypeComponent;
  let fixture: ComponentFixture<CommandeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
