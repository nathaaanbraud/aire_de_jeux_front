import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/UtilisateurService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  onSubmit(): void {
    this.utilisateurService.login(this.email, this.password).subscribe({
      next: () => {
        alert('Connexion réussie');
        this.retourner();
      }, error: () => {
        alert('Connexion échouée');
      }
    });
  }

  retourner(): void {
    this.router.navigate(['/app-tableau']);
  }
}
