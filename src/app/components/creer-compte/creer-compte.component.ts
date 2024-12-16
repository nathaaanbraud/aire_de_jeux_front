import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/UtilisateurService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  nom: string = '';
  prenom: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

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

    this.utilisateurService.creerCompte(newUser).subscribe({
      next: () => {
        alert('Compte créé avec succès');
        this.router.navigate(['/app-login']);
      }, error: () => {
        alert('Erreur lors de la création du compte');
      }
    });
  }

  retourner(): void {
    this.router.navigate(['/app-login']);
  }
}
