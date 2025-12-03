import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {TimeTablePage} from './time-table-page/time-table-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, TimeTablePage],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('selise-assesment');
}
