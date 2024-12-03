import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TableauComponent} from "./components/tableau/tableau.component";
import {MapComponent} from "./components/map/map.component";
import {JeuxService} from "./service/JeuxService";
import {FormulaireComponent} from "./components/formulaire/formulaire.component";
import {FormulaireReservationComponent} from "./components/formulaire-reservation/formulaire-reservation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableauComponent, FormulaireComponent, RouterLink, RouterLinkActive, MapComponent, FormulaireReservationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Aire de jeux';


  constructor(private jeuxService: JeuxService) {}

  // A ENLEVER
  ngOnInit(): void {}
}
