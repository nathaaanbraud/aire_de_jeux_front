import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Jeux} from "../model/Jeux";

export class JeuxService {
  // Il vaut mieux les mettre dans un fichier de configuration
  API_URL : string = 'http://localhost:8080/api'; // TODO : Vérifier si l'url est correcte
  API_ENTITY_NAME : string = 'jeux'; // TODO : Vérifier si le nom de l'entité est correcte

  constructor(private readonly http: HttpClient) { }

  // Récupérer un jeu par ID
  getJeuxById(id: number): Observable<Jeux> {
    return this.http.get<Jeux>(`${this.API_URL}/${id}`);
  }

  // Ajouter un jeu
  addJeux(jeu: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(this.API_URL, jeu);
  }
}
