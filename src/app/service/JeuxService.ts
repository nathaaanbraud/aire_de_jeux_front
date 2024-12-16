import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Jeux} from "../model/Jeux";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  // Il vaut mieux les mettre dans un fichier de configuration
  API_URL : string = '/api';
  API_ENTITY_NAME : string = 'jeux';

  constructor(private readonly http: HttpClient) { }

  /**
   * Récupère la liste de tous les jeux depuis l'API.
   * @returns Observable de la liste des jeux.
   */
  getAllJeux(): Observable<Jeux[]> {
    return this.http.get<Jeux[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  /**
   * Récupère un jeu spécifique par son ID.
   * @param id Identifiant du jeu à récupérer.
   * @returns Observable contenant les données du jeu.
   */
  getJeuxById(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  /**
   * Ajoute un nouveau jeu via l'API.
   * @param jeu Le jeu à ajouter.
   * @returns Observable contenant les données du jeu ajouté.
   */
  addJeux(jeu: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(this.API_URL, jeu);
  }

  /**
   * Supprime un jeu par son ID via l'API.
   * @param id Identifiant du jeu à supprimer.
   * @returns Observable de la suppression.
   */
  deleteJeux(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  /**
   * Met à jour les informations d'un jeu.
   * @param jeu Le jeu avec les données mises à jour.
   * @returns Observable contenant les données du jeu mis à jour.
   */
  updateJeux(jeu: Jeux): Observable<Jeux> {
    return this.http.put<Jeux>(`${this.API_URL}/${this.API_ENTITY_NAME}/${jeu.id}`, jeu);
  }

}
