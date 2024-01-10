import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MatCardModule
} from '@angular/material/card';

@Component({
  selector: 'app-card-image',
  standalone: true,
  imports: [NgStyle, MatCardModule],
  templateUrl: './card-image.component.html',
  styleUrl: './card-image.component.scss',
})
export class CardImageComponent {
  @Input() image: string = '';
  @Input() fallback: string = 'https://placehold.co/430x520';
}
