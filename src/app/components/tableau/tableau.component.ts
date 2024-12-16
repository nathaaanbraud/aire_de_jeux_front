import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Jeux } from '../../model/Jeux';
import { JeuxService } from '../../service/JeuxService';
import { Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

/**
 * Composant pour afficher un tableau paginé des aires de jeux.
 * Permet à l'utilisateur de consulter les informations des aires de jeux sous forme de tableau,
 * de naviguer vers des formulaires spécifiques et de paginer les résultats.
 */
@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  /**
   * Liste des aires de jeux récupérées depuis le service.
   */
  jeuxList: Jeux[] = [];

  /**
   * Colonnes à afficher dans le tableau (id, nom, description, etc.).
   */
  displayedColumns: string[] = ['nom', 'description', 'quantite', 'pointGeo'];

  /**
   * Liste paginée des aires de jeux à afficher.
   */
  paginatedData: Jeux[] = [];

  /**
   * Taille de chaque page (nombre d'éléments par page).
   */
  pageSize = 5;

  /**
   * Numéro de la page actuelle.
   */
  currentPage = 0;

  /**
   * Constructeur pour injecter les services nécessaires au composant.
   * @param JeuxService Service pour récupérer les données des aires de jeux.
   * @param router Service pour gérer la navigation entre les pages.
   */
  constructor(private JeuxService: JeuxService, private router: Router) {}

  /**
   * Méthode d'initialisation du composant.
   * Récupère la liste des aires de jeux depuis le service et met à jour la pagination.
   */
  ngOnInit(): void {
    this.JeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeuxList = data;
      this.updatePagination();
    });
  }
  /**
   * Met à jour les données affichées en fonction de la pagination actuelle.
   * Cette méthode est appelée à chaque changement de page ou de taille de page.
   */
  updatePagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.jeuxList.slice(startIndex, endIndex);
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
   * Redirige l'utilisateur vers le formulaire de modification de l'aire de jeu correspondant à l'ID fourni.
   * @param id Identifiant de l'aire de jeu à modifier
   */
  navigateToFormulaire(id: number): void {
    if (id) {
      this.router.navigate([`/app-formulaire-jeux/${id}`]);
    } else {
      console.error('ID non valide pour la redirection');
    }
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
}
