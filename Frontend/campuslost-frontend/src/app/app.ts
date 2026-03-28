import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Objetos } from "./objetos/objetos";

@Component({
  selector: 'app-root',
  imports: [Objetos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('campuslost-frontend');
}
