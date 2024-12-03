import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UtilisateurService} from '../../service/UtilisateurService';
import {JeuxService} from '../../service/JeuxService';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-formulaire-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './formulaire-reservation.component.html',
  styleUrl: './formulaire-reservation.component.css'
})
export class FormulaireReservationComponent implements OnInit {
  reservationForm: FormGroup;
  utilisateurs: { id: number; username: string }[] = [];
  jeux: { id: number; nom: string }[] = [];


  constructor(private formBuilder: FormBuilder, private utilisateurService: UtilisateurService,
              private jeuxService: JeuxService,
              private route: ActivatedRoute,) {
    this.reservationForm = this.formBuilder.group({
      utilisateur: ['', Validators.required],
      aire_de_jeu: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ajouterReservation() {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(this.reservationForm.value);

    localStorage.setItem('reservations', JSON.stringify(reservations));

    alert ('Réservation ajoutée');
    this.reservationForm.reset();
  }

  ngOnInit(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe((data) => {
      this.utilisateurs = data;
    });

    this.jeuxService.getAllJeux().subscribe((data) => {
      this.jeux = data;
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      console.log('Formulaire soumis avec succès', this.reservationForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }
}
