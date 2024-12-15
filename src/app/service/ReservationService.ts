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

  // Ajouter une réservation
    addReservation(reservation: {
        utilisateurId: number | undefined;
        reservation: number;
        jeuxId: number
    }): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}`, reservation);
  }

  // Recuperer toutes les reservations
  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  // recuperer une reservation par ID
  getReservationById(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  // recuperer les reservations d'un utilisateur
  getReservationByUser(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/utilisateur/${id}`);
  }

  //recuperer toutes les reservations d'un jeux
  getReservationByJeux(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/jeux/${id}`);
  }


  //                         TODO : Vérifier si cela fonctionne
  //mettre a jour une reservation
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/${reservation}`, reservation);
  }

  //supprimer une reservation
  deleteReservation(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }
}
