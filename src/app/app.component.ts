import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableauComponent} from "./components/tableau/tableau.component";
import {MapComponent} from "./components/map/map.component";
import {JeuxService} from "./service/JeuxService";
import {FormulaireReservationComponent} from "./components/formulaire-reservation/formulaire-reservation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableauComponent, MapComponent, FormulaireReservationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'projet-crud';

  constructor(private jeuxService: JeuxService) {}

  // A ENLEVER
  ngOnInit(): void {}
}
