import {Component, OnInit} from '@angular/core';
import {MatTabLink, MatTabNav} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatTabNav,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  /**
   * Tableau des liens de navigation qui seront affichés dans l'en-tête.
   */
  navLinks: any[];

  /**
   * Constructeur du composant, initialise les liens de navigation.
   */
  constructor() {
    this.navLinks = [
      {
        label: 'Aires de jeux',
        link: 'app-tableau',
        index: 0
      }, {
        label: 'Carte',
        link: 'app-map',
        index: 1
      }, {
        label: 'Réservation',
        link: 'app-formulaire-reservation',
        index: 2
      }, {
        label: 'Connexion',
        link: 'app-login',
        index: 3
      }, {
        label: 'Mes Réservations',
        link: 'app-tableau-reservation',
        index: 3
      }
    ];

  }


}
