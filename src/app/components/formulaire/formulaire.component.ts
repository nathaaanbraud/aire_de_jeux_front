import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnChanges {
  @Input() objetSelectionne: any;
  formulaireForm: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.formulaireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      quantite: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(200)],
      pointGeo: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['objetSelectionne'] && this.objetSelectionne) {
      this.formulaireForm.patchValue(this.objetSelectionne);
    }
  }

  onSubmit(): void {
    if (this.formulaireForm.valid) {
      console.log('Données sauvegardées :', this.formulaireForm.value);
    }
  }

  retourner(): void {
    this.location.back();
  }
}
