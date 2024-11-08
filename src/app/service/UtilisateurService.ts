import {HttpClient} from "@angular/common/http";

export class UtilisateurService {
  // Il vaut mieux les mettre dans un fichier de configuration
  API_URL : string = 'http://localhost:8080/api'; // TODO : Vérifier si l'url est correcte
  API_ENTITY_NAME : string = 'utilisateur'; // TODO : Vérifier si le nom de l'entité est correcte

  constructor(private readonly http: HttpClient) { }
}
