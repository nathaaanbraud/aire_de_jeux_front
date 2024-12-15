import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../model/Utilisateur";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  API_URL : string = '/api';
  API_ENTITY_NAME : string = 'utilisateurs';

  private currentUser: Utilisateur | null = null;

  constructor(private readonly http: HttpClient) { }

  //retourne la liste des utilisateurs
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }
  //met l'utilisateur actuel
  setCurrentUser(user: Utilisateur): void {
    this.currentUser = user;
  }
  //retourne l'utilisateur actuel
  getCurrentUser(): Utilisateur | null {
    return this.currentUser;
  }
  //connexion
  login(mail: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.API_ENTITY_NAME}/login`, { mail, password });
  }
  //verifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
  //creer un compte
  creerCompte(newUser: Utilisateur): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.API_ENTITY_NAME}`, newUser);
  }
  //deconnexion
  deconnexion(): void {
    this.currentUser = null;
  }
}
