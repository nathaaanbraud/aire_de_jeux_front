import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/UtilisateurService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';
/**
 * Composant pour gérer la création d'un nouveau compte utilisateur.
 * Fournit un formulaire permettant à l'utilisateur de s'enregistrer en saisissant ses informations.
 */
@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.component.html',
  styleUrls: ['./creer-compte.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class CreerCompteComponent {
  /**
   * Nom de l'utilisateur pour la création du compte.
   */
  nom: string = '';
  /**
   * Prénom de l'utilisateur pour la création du compte.
   */
  prenom: string = '';
  /**
   * Nom d'utilisateur de l'utilisateur pour la création du compte.
   */
  username: string = '';
  /**
   * Email de l'utilisateur pour la création du compte.
   */
  email: string = '';
  /**
   * Mot de passe de l'utilisateur pour la création du compte.
   */
  password: string = '';

  /**
   * Constructeur pour injecter les services nécessaires (UtilisateurService et Router).
   * @param utilisateurService
   * @param router
   * @param notificationService
   */
  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  /**
   * Méthode appelée lorsque le formulaire est soumis.
   * Cette méthode crée un objet utilisateur avec les valeurs du formulaire et appelle le service pour créer un nouveau compte.
   * Si la création est réussie, l'utilisateur est redirigé vers la page de connexion.
   */
  onSubmit(): void {
    const newUser = {
      id: 0, // L'ID sera généré par le backend
      nom: this.nom,
      prenom: this.prenom,
      mail: this.email,
      password: this.password,
      username: this.username
    };

    /**
     * Appel du service pour créer un nouveau compte utilisateur.
     */
    this.utilisateurService.creerCompte(newUser).subscribe({
      next: () => {
        this.notificationService.showValidation('Compte créé avec succès !');
        this.router.navigate(['/app-login']);
      }
    });
  }

  /**
   * Redirige l'utilisateur vers la page de connexion.
   */
  retourner(): void {
    this.router.navigate(['/app-login']);
  }
}
