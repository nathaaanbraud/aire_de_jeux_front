import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulaireJeuxComponent } from './formulaire-jeux.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormulaireComponent', () => {
  let component: FormulaireJeuxComponent;
  let fixture: ComponentFixture<FormulaireJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormulaireJeuxComponent,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    expect(component.formulaireForm.valid).toBeFalse();
  });

  it('should validate the form when fields are filled', () => {
    component.formulaireForm.patchValue({
      nom: 'Test Nom',
      quantite: 10,
      description: 'Une description',
      pointGeo: 'Point géographique'
    });
    expect(component.formulaireForm.valid).toBeTrue();
  });
});
