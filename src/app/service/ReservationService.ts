import {HttpClient} from "@angular/common/http";

export class ReservationService {
  // Il vaut mieux les mettre dans un fichier de configuration
  API_URL : string = 'http://localhost:8080/api';
  API_ENTITY_NAME : string = 'reservation'; // TODO : Vérifier si le nom de l'entité est correcte

  constructor(private readonly http: HttpClient) { }
}
