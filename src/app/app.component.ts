import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TableauComponent} from "./components/tableau/tableau.component";
import {JeuxService} from "./service/JeuxService";
import {FormulaireComponent} from "./components/formulaire/formulaire.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableauComponent, FormulaireComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  //template:`<router-outlet></router-outlet>`,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Aire de jeux';


  constructor(private jeuxService: JeuxService) {}

  // A ENLEVER
  ngOnInit(): void {
    this.jeuxService.getJeuxById(39).subscribe(jeu => {
      console.log('Game:', jeu);
    });
  }
}
