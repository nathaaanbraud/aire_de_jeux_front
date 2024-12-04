import {ActivatedRoute} from "@angular/router";
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {Jeux} from "../../model/Jeux";
import {JeuxService} from "../../service/JeuxService";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './formulaire-jeux.component.html',
  styleUrls: ['./formulaire-jeux.component.css']
})
export class FormulaireJeuxComponent implements OnInit {
  @Input() objetSelectionne: any;
  jeu!: Jeux;
  formulaireForm: FormGroup;
  id = Number(this.route.snapshot.paramMap.get('id')); //recupere id aire de jeux et charge les données

  constructor(private fb: FormBuilder, private jeuxService: JeuxService,
              private route: ActivatedRoute, private router: Router ) {
    this.formulaireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      quantite: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(200)],
      pointGeo: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      // Appelle le service pour récupérer l'objet correspondant à l'ID
      this.jeuxService.getJeuxById(id).subscribe((data: any) => {
        this.jeu = data as Jeux; // Stocke l'objet récupéré
        this.formulaireForm.patchValue(this.jeu); // Pré-remplit le formulaire
      });
    }
  }

  onSubmit(): void {
    if (this.formulaireForm.valid) {
      const updatedJeu: Jeux = {
        id: this.id,
        ...this.formulaireForm.value
      };
      this.jeuxService.updateJeux(updatedJeu).subscribe({
        next: () => {
          alert('Données sauvegardées avec succès');
          this.retourner();
        },
        error: (error) => {
          alert('Erreur lors de la sauvegarde des données');
        }
      });
    }
  }

  retourner(): void {
    this.router.navigate([`/app-tableau`]);
  }
}
