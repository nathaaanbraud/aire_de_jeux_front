import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Jeux } from '../../model/Jeux';
import { JeuxService } from '../../service/JeuxService';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true
})
export class MapComponent implements AfterViewInit {
  jeuxList: Jeux[] = [];
  private map: L.Map | undefined;

  constructor(private jeuxService: JeuxService) {}

  ngAfterViewInit(): void {
    this.initMap();
    // Charger les données des jeux via le service et initialiser la carte
    this.jeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeuxList = data;
      this.addMarkers(); // Ajouter les marqueurs après l'initialisation de la carte
    });
  }

  private initMap(): void {
    // Initialiser la carte avec un centre par défaut (Paris)
    this.map = L.map('map').setView([47.3475, 0.7191], 13); // Coordonnées de Tours

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private addMarkers(): void {
    if (this.map) {
      this.jeuxList.forEach((jeu) => {
        // Vérifier que pointGeo existe et est bien formaté
        if (jeu.pointGeo) {
          const [lat, lng] = jeu.pointGeo
            .split(',')
            .map((coord) => parseFloat(coord.trim())); // Séparer les coordonnées et les convertir en float

          // Vérifier que les coordonnées sont valides
          if (!isNaN(lat) && !isNaN(lng)) {
            // Ajouter le marqueur sur la carte
            L.marker([lat, lng])
              .addTo(this.map!)
              .bindPopup(
                `<b>${jeu.nom}</b><br>${jeu.description}<br>Quantité: ${jeu.quantite}`
              );
          }
        }
      });
    }
  }
}
