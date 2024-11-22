import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JeuxService} from "./service/JeuxService";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'projet-crud';

  constructor(private jeuxService: JeuxService) {

  }

  ngOnInit(): void {
    this.jeuxService.getJeux().subscribe(jeu => {
      console.log('Game:', jeu);
    });
  }
}
