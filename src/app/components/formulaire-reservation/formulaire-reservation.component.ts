import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Jeux } from "../../model/Jeux";
import { Utilisateur } from "../../model/Utilisateur";
import { UtilisateurService } from '../../service/UtilisateurService';
import { JeuxService } from '../../service/JeuxService';
import { ReservationService } from '../../service/ReservationService';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgForOf } from "@angular/common";
import { NotificationService } from '../../service/notification.service';

/**
 * Composant pour gérer le formulaire de réservation.
 * Ce composant permet à un utilisateur connecté de réserver une aire de jeu spécifique en indiquant une quantité.
 */
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
  /**
   * Formulaire réactif pour gérer les champs de la réservation.
   */
  reservationForm: FormGroup;

  /**
   * Liste des aires de jeux disponibles pour la réservation.
   */
  jeux: Jeux[] = [];

  /**
   * Utilisateur actuellement connecté.
   * Null ou undefined si aucun utilisateur n'est connecté.
   */
  currentUser: Utilisateur | null | undefined;

  /**
   * Constructeur du composant.
   * Initialise le formulaire de réservation et injecte les services nécessaires.
   * @param formBuilder Service permettant de construire des formulaires réactifs.
   * @param utilisateurService Service pour gérer les utilisateurs.
   * @param jeuxService Service pour récupérer les données des jeux.
   * @param reservationService Service pour enregistrer les réservations.
   * @param router Service de navigation entre les routes Angular.
   * @param notificationService
   */
  constructor(private formBuilder: FormBuilder, private utilisateurService: UtilisateurService,
              private jeuxService: JeuxService,
              private reservationService: ReservationService,
              private router: Router,
              private notificationService: NotificationService) {
    this.reservationForm = this.formBuilder.group({
      jeuxId: ['', Validators.required],
      reservation: [1, [Validators.required, Validators.min(1)]]
    });
  }

  /**
   * Vérifie si l'utilisateur est connecté, si oui récupere l'utilisateur sinon le redige vers la page de connection.
   */
  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté
    if (!this.utilisateurService.isLoggedIn()) {
      alert('Vous devez être connecté pour accéder à cette page');
      this.router.navigate(['/app-login']);
      return;
    }
    // Récupère l'utilisateur connecté (si disponible)
    this.currentUser = this.utilisateurService.getCurrentUser();
    // Récupère la liste des jeux
    this.jeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeux = data;
    });
  }


  /**
   * Méthode déclenchée lors de la soumission du formulaire.
   * Enregistre une réservation en vérifiant la validité du formulaire.
   * Si le formulaire est valide, les données de réservation sont envoyées au service pour être enregistrées.
   */
  onSubmit(): void {
    // Vérifie si le formulaire est valide
    if (this.reservationForm.valid) {
      const formValues = {
        utilisateurId: this.currentUser?.id,
        jeuxId: Number(this.reservationForm.value.jeuxId),
        reservation: Number(this.reservationForm.value.reservation)
      };
      // Enregistre la réservation
      this.reservationService.addReservation(formValues).subscribe({
        next: () => {
          this.notificationService.showValidation('Données sauvegardées avec succès');
        }
      });
    }
  }
}
