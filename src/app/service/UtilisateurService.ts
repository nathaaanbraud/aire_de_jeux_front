import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../model/Utilisateur";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  // Il vaut mieux les mettre dans un fichier de configuration
  API_URL : string = '/api';
  API_ENTITY_NAME : string = 'utilisateurs';

  constructor(private readonly http: HttpClient) { }

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }
}
