// Objet Jeux
export interface Jeux {
  // Identifiant unique de l'aire de jeu.
  id: number;

  // Nom du jeu.
  nom: string;

  // Description de l'aire de jeu (peut être null).
  description: string | null;

  // Quantité de l'aire de jeux disponibles.
  quantite: number;

  // Point géographique de l'aire de jeu.
  pointGeo: string;

}
