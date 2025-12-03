import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatButtonModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('selise-assesment');
}
