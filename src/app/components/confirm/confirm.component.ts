import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '@components/confirm/dialog-data.model';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogActions],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  public dialogRef = inject(MatDialogRef<ConfirmComponent>);
  public data: DialogData =  inject(MAT_DIALOG_DATA);
}
