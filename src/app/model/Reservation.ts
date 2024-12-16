// Objet Reservation
export interface Reservation {
  // Identifiant unique de l'utilisateur ayant effectué la réservation.
  utilisateurId: number;

  // Identifiant unique du jeu réservé.
  jeuxId: number;

  // Quantité de réservations effectuées pour ce jeu par l'utilisateur.
  reservation: number;

}
