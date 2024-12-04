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

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private jeuxService: JeuxService,private router: Router ) {
    this.formulaireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      quantite: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(200)],
      pointGeo: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  private chargerJeux(id: number): void {
    const objet = this.jeuxService.getJeuxById(id); //remplacer par un service
    if (objet) {
      this.formulaireForm.patchValue(objet);
    }
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
      this.jeuxService.updateJeux(updatedJeu).subscribe(() => {
        console.log('Données sauvegardées :', updatedJeu);
        this.retourner();
      }, error => {
        console.error('Erreur lors de la sauvegarde des données:', error);
      });
    }
  }

  retourner(): void {
    this.router.navigate([`/app-tableau`]);
  }
}
