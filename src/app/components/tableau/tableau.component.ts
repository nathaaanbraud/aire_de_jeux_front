import {Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Jeux} from "../../model/Jeux";
import {JeuxService} from "../../service/JeuxService";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.css'
})
export class TableauComponent implements OnInit {
  jeux!: Observable<Jeux[]>;
  jeuxList: Jeux[]=[];
  constructor(private JeuxService: JeuxService) { }

  ngOnInit() : void {
    this.JeuxService.getAllJeux().subscribe((data: Jeux[]) => {
      this.jeuxList = data;
    });
  };
}
