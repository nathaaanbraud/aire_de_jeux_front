import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCompteComponent } from './creer-compte.component';

/**
 * Suite de tests pour le composant `CreerCompteComponent`.
 * Vérifie le bon fonctionnement de la création de comptes.
 */
describe('CreerCompteComponent', () => {
  let component: CreerCompteComponent;
  let fixture: ComponentFixture<CreerCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
