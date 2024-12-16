import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../notification.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService); // Injection de service dans une fonction

  return next(req).pipe(
    catchError((error) => {
      console.log('Erreur capturée dans l’intercepteur :', error);

      // Vérifier la structure de l'erreur et afficher le message correspondant
      let errorMessage = error.error?.error || 'Requête invalide.';

      if (error.status === 400) {
        notificationService.showError(errorMessage);  // Affiche le message d'erreur spécifique
      } else if (error.status === 401) {
        notificationService.showError(error.error?.error || 'Erreur d\'authentification');  // Affiche le message d'erreur spécifique
      } else if (error.status === 404) {
        notificationService.showError(error.error?.error || 'Ressource introuvable.');
      } else if (error.status === 500) {
        notificationService.showError(error.error?.error || 'Erreur interne du serveur.');
      } else {
        notificationService.showError('Une erreur inattendue est survenue.');
      }

      // Retourner l'erreur pour qu'elle soit gérée par d'autres parties du code si nécessaire
      return throwError(() => error);
    })
  );
};
