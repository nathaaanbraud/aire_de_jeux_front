import {inject, Injectable} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilisateurService } from '../service/UtilisateurService';

/**
 * route guard pour sécuriser l'accès aux routes nécessitant une authentification.
 * Si l'utilisateur est connecté, l'accès à la route est autorisé.
 * Sinon, l'utilisateur est redirigé vers la page de connexion.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  /**
   * Fonction statique utilisée pour protéger les routes.
   * Vérifie si l'utilisateur est connecté. Si c'est le cas, il accède à la route.
   * Sinon, il est redirigé vers la page de connexion.
   * @param route L'objet de la route demandée (non utilisé dans ce cas).
   * @param state L'état de la route (non utilisé dans ce cas).
   * @returns true si l'utilisateur est authentifié, sinon false et redirection vers la page de login.
   */
  static canActivate: CanActivateFn = (route, state) => {
    const utilisateurService = inject(UtilisateurService);
    const router = inject(Router);

    if (utilisateurService.isLoggedIn()) {
      return true;
    } else {
      router.navigate(['/app-login']);
      return false;
    }
  };
}
