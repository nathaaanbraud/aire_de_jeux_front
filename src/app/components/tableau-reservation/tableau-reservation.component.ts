import {Component, OnInit} from '@angular/core';
import {Jeux} from "../../model/Jeux";
import {Router} from "@angular/router";
import {Reservation} from "../../model/Reservation";
import {ReservationService} from "../../service/ReservationService";
import {UtilisateurService} from "../../service/UtilisateurService";
import {JeuxService} from "../../service/JeuxService";
import {Utilisateur} from "../../model/Utilisateur";
import {MatPaginator} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-tableau-reservation',
  standalone: true,
  imports: [
    MatPaginator,
    NgForOf,
    NgIf
  ],
  templateUrl: './tableau-reservation.component.html',
  styleUrl: './tableau-reservation.component.css'
})
export class TableauReservationComponent implements OnInit{
  /**
   * Liste des reservation récupérées depuis le service.
   */
  reservationList: Reservation[] = [];

  /**
   * Utilisateur actuellement connecté.
   * Null ou undefined si aucun utilisateur n'est connecté.
   */
  currentUser: Utilisateur | null | undefined;

  /**
   * Colonnes à afficher dans le tableau (infos aires de jeux +quantité reservée).
   */
  displayedColumns: string[] = ['nom', 'description', 'pointGeo','reservation'];

  /**
   * Liste paginée des aires de jeux à afficher.
   */
  paginatedData: Reservation[] = [];

  /**
   * Taille de chaque page (nombre d'éléments par page).
   */
  pageSize = 5;

  /**
   * Numéro de la page actuelle.
   */
  currentPage = 0;

  jeuxMap: { [id: number]: any } = {}; // Mapping entre jeuxId et détails des jeux

  /**
   * Constructeur pour injecter les services nécessaires au composant.
   * @param ReservationService Service pour récupérer les données des reservations
   * @param utilisateurService
   * @param jeuxService
   * @param router Service pour gérer la navigation entre les pages.
   * @param notificationService
   */
  constructor(private ReservationService: ReservationService,
              private utilisateurService: UtilisateurService,
              private jeuxService: JeuxService,
              private router: Router,
              private notificationService: NotificationService
              ) {}

  /**
   * Méthode d'initialisation du composant.
   * Récupère la liste des reservations depuis le service et met à jour la pagination.
   */
  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté
    if (!this.utilisateurService.isLoggedIn()) {
      alert('Vous devez être connecté pour accéder à cette page');
      this.router.navigate(['/app-login']);
      return;
    }
    this.currentUser = this.utilisateurService.getCurrentUser();
    const userId = this.currentUser?.id;
    if (userId !== undefined) {
      this.ReservationService.getReservationByUser(userId).subscribe((data: any) => {
        this.reservationList = data
        this.fetchJeuxDetails();
        this.updatePagination();
      });
    }
  }

  /**
   * Récupère les détails des jeux réservés par l'utilisateur.
   *
   */
  fetchJeuxDetails(): void {
    this.reservationList.forEach(reservation => {
      this.jeuxService.getJeuxById(reservation.jeuxId).subscribe((jeux: any) => {
        this.jeuxMap[reservation.jeuxId] = jeux;
      });
    });
  }

  /**
   * Met à jour les données affichées en fonction de la pagination actuelle.
   * Cette méthode est appelée à chaque changement de page ou de taille de page.
   */
  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.reservationList.slice(startIndex, endIndex);
  }

  /**
   * Méthode appelée lors du changement de page ou de taille de page dans le paginator.
   * Elle met à jour la page courante et la taille de la page, puis actualise les éléments affichés.
   * @param event Événement de changement de page (pageIndex) ou de taille de page (pageSize).
   */
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  /**
   * REdirige vers le formulaire de réservation.
   */
  navigateToFormulaireReservation(): void {
    this.router.navigate(['/app-formulaire-reservation/']);
  }

  /**
   * REdirige vers la carte.
   */
  navigateToMap(): void {
    this.router.navigate(['/app-map/']);
  }

  deleteReservation(utilisateurId: number, jeuxId: number): void {
    this.ReservationService.deleteReservation(utilisateurId, jeuxId).subscribe(() => {
      this.reservationList = this.reservationList.filter(reservation => reservation.jeuxId !== jeuxId);
      this.updatePagination();
    });
    this.notificationService.showValidation('Réservation supprimée avec succès');
  }
}
