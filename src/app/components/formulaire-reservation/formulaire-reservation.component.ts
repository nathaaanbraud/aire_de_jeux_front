import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Jeux} from "../../model/Jeux";
import {Utilisateur} from "../../model/Utilisateur";
import {UtilisateurService} from '../../service/UtilisateurService';
import {JeuxService} from '../../service/JeuxService';
import {ReservationService} from '../../service/ReservationService';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-formulaire-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './formulaire-reservation.component.html',
  styleUrl: './formulaire-reservation.component.css'
})
export class FormulaireReservationComponent implements OnInit {
  reservationForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  jeux: Jeux[] = [];

  constructor(private formBuilder: FormBuilder, private utilisateurService: UtilisateurService,
              private jeuxService: JeuxService,
              private reservationService: ReservationService,
              private router: Router) {
    this.reservationForm = this.formBuilder.group({
      utilisateurId: ['', Validators.required],
      jeuxId: ['', Validators.required],
      reservation: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe((data: Utilisateur[]) => {
      this.utilisateurs = data;
    });

    this.jeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeux = data;
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formValues = {
        utilisateurId: Number(this.reservationForm.value.utilisateurId),
        jeuxId: Number(this.reservationForm.value.jeuxId),
        reservation: Number(this.reservationForm.value.reservation)
      };
      alert(JSON.stringify(formValues));
      this.reservationService.addReservation(formValues).subscribe({
        next: () => {
          alert('Données sauvegardées avec succès');
          this.retourner();
        }, error: (error) => {
          alert('Erreur lors de la sauvegarde des données');
        }
      });
    }
  }

  retourner(): void {
    this.router.navigate(['/app-tableau']);
  }
}
