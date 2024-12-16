import {ActivatedRoute} from "@angular/router";
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {Jeux} from "../../model/Jeux";
import {JeuxService} from "../../service/JeuxService";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

/**
 * Composant pour gérer le formulaire des aires de jeux.
 * Permet d'ajouter ou de modifier les informations d'une aire de jeu.
 */
@Component({
  selector: 'app-formulaire-jeux',
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
  /**
   * Objet sélectionné (peut être injecté depuis un autre composant parent).
   */
  @Input() objetSelectionne: any;

  /**
   * Entité représentant une aire de jeu.
   * Utilisée pour stocker les données récupérées par le service.
   */
  jeu!: Jeux;

  /**
   * Formulaire réactif pour gérer les champs liés à une aire de jeu.
   */
  formulaireForm: FormGroup;

  /**
   * Identifiant de l'aire de jeu récupéré depuis l'URL.
   */
  id = Number(this.route.snapshot.paramMap.get('id')); // Récupère l'ID à partir des paramètres de l'URL.

  /**
   * Constructeur pour injecter les dépendances nécessaires au composant.
   * @param fb FormBuilder pour initialiser le formulaire.
   * @param jeuxService Service pour gérer les opérations liées aux aires de jeux.
   * @param route ActivatedRoute pour accéder aux paramètres de la route active.
   * @param router Router pour gérer la navigation entre les pages.
   */
  constructor(private fb: FormBuilder, private jeuxService: JeuxService,
              private route: ActivatedRoute, private router: Router ) {
    this.formulaireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      quantite: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(200)],
      pointGeo: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  /**
   * Récupère l'ID de l'aire de jeu à partir de l'URL et charge ses données si une aire de jeu correspond a celui-ci.
   * Remplissage automatique du formulaire avec les données récupérées.
   */
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

  /**
   * Méthode déclenchée lors de la soumission du formulaire.
   * Si le formulaire est valide, envoie les données au service pour les sauvegarder.
   */
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
