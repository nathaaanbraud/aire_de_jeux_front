import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../model/Reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // Il vaut mieux les mettre dans un fichier de configuration
  API_URL : string = '/api';
  API_ENTITY_NAME : string = 'reservations';

  constructor(private readonly http: HttpClient) { }

  /**
   * Ajoute une nouvelle réservation pour un utilisateur.
   * @param reservation Contient les informations de la réservation : ID de l'utilisateur, ID du jeu et quantité réservée.
   * @returns Observable de la réservation ajoutée.
   */
    addReservation(reservation: {
        utilisateurId: number | undefined;
        reservation: number;
        jeuxId: number
    }): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}`, reservation);
  }

  /**
   * Récupère toutes les réservations depuis l'API.
   * @returns Observable contenant la liste de toutes les réservations.
   */
  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  /**
   * Récupère une réservation spécifique par son ID.
   * @param id Identifiant unique de la réservation à récupérer.
   * @returns Observable contenant les données de la réservation.
   */
  getReservationById(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  /**
   * Récupère les réservations d'un utilisateur spécifique par son ID.
   * @param id Identifiant de l'utilisateur pour lequel récupérer ses réservations.
   * @returns Observable contenant les réservations de l'utilisateur.
   */
  getReservationByUser(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/utilisateur/${id}`);
  }

  /**
   * Récupère les réservations effectuées pour un jeu spécifique par son ID.
   * @param id Identifiant du jeu pour lequel récupérer les réservations.
   * @returns Observable contenant les réservations du jeu.
   */
  getReservationByJeux(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/jeux/${id}`);
  }


  //                         TODO : Vérifier si cela fonctionne
  /**
   * Met à jour une réservation existante.
   * @param reservation Objet contenant les données de la réservation à mettre à jour.
   * @returns Observable contenant les données de la réservation mise à jour.
   */
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/${reservation}`, reservation);
  }

  /**
   * Supprime une réservation spécifique par son ID.
   * @param utilisateurId Identifiant de l'utilisateur pour lequel supprimer la réservation.
   * @param jeuxId Identifiant du jeu pour lequel supprimer la réservation.
   * @returns Observable de la suppression.
   */
  deleteReservation(utilisateurId: number, jeuxId: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${utilisateurId}/${jeuxId}`);
  }
}
