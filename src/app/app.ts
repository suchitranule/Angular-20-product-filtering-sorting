import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signaldemo');
  public randomNumber = signal("hi");

  ngOnInit() {
      setTimeout(() => {this.randomNumber.update(v=> v+ " suchitra");},1000);
  }
}
