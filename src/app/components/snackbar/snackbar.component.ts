import { JsonPipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent implements OnInit {
  public content = inject(MAT_SNACK_BAR_DATA);
  ngOnInit() {
  }
}
