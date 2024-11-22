import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableauComponent} from "./components/tableau/tableau.component";
import {JeuxService} from "./service/JeuxService";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableauComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'projet-crud';

  constructor(private jeuxService: JeuxService) {}

  // A ENLEVER
  ngOnInit(): void {
    this.jeuxService.getJeuxById(39).subscribe(jeu => {
      console.log('Game:', jeu);
    });
  }
}
