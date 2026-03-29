import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {}
