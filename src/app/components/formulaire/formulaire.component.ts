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
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  @Input() objetSelectionne: any;
  jeu!: Jeux;
  formulaireForm: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private location: Location,private jeuxService: JeuxService,private router: Router ) {
    this.formulaireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      quantite: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.maxLength(200)],
      pointGeo: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }
  //recupere id aire de jeux et charge les données
  id = Number(this.route.snapshot.paramMap.get('id'));


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
      console.log('Données sauvegardées :', this.formulaireForm.value);
    }
  }

  retourner(): void {
    this.router.navigate([`/app-tableau`]);
  }
}
