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

  //retourne la liste des jeux
  getAllJeux(): Observable<Jeux[]> {
    return this.http.get<Jeux[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  // Récupérer un jeu par ID
  getJeuxById(id: number): Observable<{}> {
    return this.http.get<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  // Ajouter un jeu
  addJeux(jeu: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(this.API_URL, jeu);
  }

  // Supprimer un jeu
  deleteJeux(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  // Mettre à jour un jeu
  updateJeux(jeu: Jeux): Observable<Jeux> {
    return this.http.put<Jeux>(`${this.API_URL}/${this.API_ENTITY_NAME}/${jeu.id}`, jeu);
  }

}
