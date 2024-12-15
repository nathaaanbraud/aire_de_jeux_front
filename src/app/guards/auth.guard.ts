import {inject, Injectable} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilisateurService } from '../service/UtilisateurService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
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
