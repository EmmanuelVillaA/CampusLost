import { Component, OnInit } from '@angular/core';

import { Objeto } from '../../models/objeto';
import { ObjetoService } from '../../service/objeto.service';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css']
})

export class ObjetosComponent implements OnInit {

  objetos: Objeto[] = [];

  constructor(private service: ObjetoService) {}

  ngOnInit() {
    this.service.getAll().subscribe((data: Objeto[]) => (this.objetos = data));
  }
}