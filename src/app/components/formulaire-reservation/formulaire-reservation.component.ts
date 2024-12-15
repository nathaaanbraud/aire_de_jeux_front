import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Jeux } from "../../model/Jeux";
import { Utilisateur } from "../../model/Utilisateur";
import { UtilisateurService } from '../../service/UtilisateurService';
import { JeuxService } from '../../service/JeuxService';
import { ReservationService } from '../../service/ReservationService';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgForOf } from "@angular/common";

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
  styleUrls: ['./formulaire-reservation.component.css']
})
export class FormulaireReservationComponent implements OnInit {
  reservationForm: FormGroup;
  jeux: Jeux[] = [];
  currentUser: Utilisateur | null | undefined;

  constructor(private formBuilder: FormBuilder, private utilisateurService: UtilisateurService,
              private jeuxService: JeuxService,
              private reservationService: ReservationService,
              private router: Router) {
    this.reservationForm = this.formBuilder.group({
      jeuxId: ['', Validators.required],
      reservation: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (!this.utilisateurService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = this.utilisateurService.getCurrentUser();

    this.jeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeux = data;
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formValues = {
        utilisateurId: this.currentUser?.id,
        jeuxId: Number(this.reservationForm.value.jeuxId),
        reservation: Number(this.reservationForm.value.reservation)
      };
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
