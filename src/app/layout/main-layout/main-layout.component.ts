import { Component, HostListener } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [MaterialModule, RouterOutlet, NgIf, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isLargeScreen = window.innerWidth >= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth >= 768;
  }
}
