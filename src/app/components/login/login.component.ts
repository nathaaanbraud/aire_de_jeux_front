import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/UtilisateurService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Utilisateur} from "../../model/Utilisateur";
import {NgIf} from "@angular/common";

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
  email: string = '';
  password: string = '';
  currentUser: Utilisateur | null = null;

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {
    // Récupère l'utilisateur connecté (si disponible)
    this.currentUser = this.utilisateurService.getCurrentUser();
  }

  onSubmit(): void {
    this.utilisateurService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.utilisateurService.setCurrentUser(response);
        this.currentUser = response; // Stocke les informations utilisateur
        alert('Connexion réussie');
      }, error: () => {
        alert('Connexion échouée');
      }
    });
  }

  creerCompte(): void {
    this.router.navigate(['/app-creer-compte']);
  }
  deconnexion(): void {
    this.utilisateurService.deconnexion(); // Déconnecte l'utilisateur
    this.currentUser = null; // Réinitialise les informations utilisateur
    alert('Déconnexion réussie');
  }
}
