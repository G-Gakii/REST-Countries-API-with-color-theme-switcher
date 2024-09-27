import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  mode!: boolean;
  constructor(public service: CountriesService) {}

  toogle() {
    this.service.darkMode.update((value) => !value);
  }
}
