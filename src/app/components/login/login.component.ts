import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/UtilisateurService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Utilisateur} from "../../model/Utilisateur";
import {NgIf} from "@angular/common";
import { NotificationService } from '../../service/notification.service';

/**
 * Composant pour gérer la connexion des utilisateurs.
 * Permet à un utilisateur de se connecter en saisissant son adresse email et son mot de passe.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class LoginComponent {
  /**
   * Email de l'utilisateur pour la connexion.
   */
  email: string = '';

  /**
   * Mot de passe de l'utilisateur pour la connexion.
   */
  password: string = '';

  /**
   * Utilisateur actuellement connecté (si disponible).
   */
  currentUser: Utilisateur | null = null;

  /**
   * Constructeur pour injecter les services nécessaires (UtilisateurService et Router).
   * @param utilisateurService Service de gestion des utilisateurs.
   * @param router Service de navigation entre les pages.
   * @param notificationService
   */
  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private notificationService: NotificationService
  ) {}


  /**
   * Initialisation du composant.
   * Récupère l'utilisateur connecté (si un utilisateur est déjà connecté).
   */
  ngOnInit(): void {
    // Récupère l'utilisateur connecté (si disponible)
    this.currentUser = this.utilisateurService.getCurrentUser();
  }

  /**
   * Méthode déclenchée lors de la soumission du formulaire de connexion.
   * Si les informations sont correctes, l'utilisateur est connecté a
   * Sinon, un message d'erreur est affiché.
   */
  onSubmit(): void {
    this.utilisateurService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.utilisateurService.setCurrentUser(response);
        this.currentUser = response; // Stocke les informations utilisateur
        this.notificationService.showValidation('Connexion réussie !');
      }
    });
  }

  /**
   * Redirige l'utilisateur vers la page de création de compte.
   */
  creerCompte(): void {
    this.router.navigate(['/app-creer-compte']);
  }

  /**
   * Méthode pour déconnecter l'utilisateur et réinitialiser les informations de connexion.
   */
  deconnexion(): void {
    this.utilisateurService.deconnexion(); // Déconnecte l'utilisateur
    this.currentUser = null; // Réinitialise les informations utilisateur
    alert('Déconnexion réussie');
  }
}
