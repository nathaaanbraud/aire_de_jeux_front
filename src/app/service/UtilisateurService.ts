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


  /**
   * Retourne la liste de tous les utilisateurs.
   * @returns Un observable contenant un tableau d'utilisateurs
   */
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  /**
   * Définit l'utilisateur actuel.
   * @param user L'utilisateur à définir comme l'utilisateur actuel
   */
  setCurrentUser(user: Utilisateur): void {
    this.currentUser = user;
  }

  /**
   * Retourne l'utilisateur actuel.
   * @returns L'utilisateur actuel ou null si aucun utilisateur n'est connecté
   */
  getCurrentUser(): Utilisateur | null {
    return this.currentUser;
  }

  /**
   * Connexion de l'utilisateur en utilisant son email et son mot de passe.
   * @param mail L'email de l'utilisateur
   * @param password Le mot de passe de l'utilisateur
   * @returns Un observable contenant la réponse de la requête de connexion
   */
  login(mail: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.API_ENTITY_NAME}/login`, { mail, password });
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   * @returns Un booléen indiquant si un utilisateur est actuellement connecté
   */
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }


  /**
   * Crée un nouveau compte utilisateur.
   * @param newUser L'utilisateur à créer
   * @returns Un observable contenant la réponse de la requête de création de compte
   */
  creerCompte(newUser: Utilisateur): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.API_ENTITY_NAME}`, newUser);
  }

  /**
   * Déconnexion de l'utilisateur actuel.
   * Réinitialise la variable currentUser à null pour marquer l'utilisateur comme déconnecté.
   */
  deconnexion(): void {
    this.currentUser = null;
  }
}
