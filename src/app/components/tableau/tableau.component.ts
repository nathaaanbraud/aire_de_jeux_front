import {Component, OnInit} from '@angular/core';
import {Jeux} from "../../model/Jeux";
import {JeuxService} from "../../service/JeuxService";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent implements OnInit {
  jeux!: Jeux[];

  constructor(private JeuxService: JeuxService) { }

  ngOnInit() : void {
    this.jeux = this.JeuxService.getAll();
  }
}
