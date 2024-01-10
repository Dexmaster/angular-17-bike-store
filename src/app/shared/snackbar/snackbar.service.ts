import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  readonly #snack = inject(MatSnackBar);
  private open(data: any, panelClass: string[] = [], duration = 3000): void {
    this.#snack.openFromComponent(SnackbarComponent, {
      data,
      duration,
      panelClass
    });
  }

  error(message: string) {
    return this.open(message, ['snackbar-error']);
  }

  success(message: string) {
    return this.open(message, ['snackbar-success']);
  }

  info(message: string) {
    return this.open(message, ['snackbar-info']);
  }
}
