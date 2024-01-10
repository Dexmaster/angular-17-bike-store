import { CommonModule, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Bike } from '../bike.model';
import { BikeService } from '../bike.service';
import { MatCardModule } from '@angular/material/card';
import { CardImageComponent } from '@components/card-image/card-image.component';

@Component({
  selector: 'app-bikes-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    NgStyle,
    CardImageComponent,
  ],
  templateUrl: './bikes-detail.component.html',
  styleUrl: './bikes-detail.component.scss',
})
export default class BikesDetailComponent {
  id!: string;
  bike!: Bike;
  feedback: any = {};

  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #bikeService = inject(BikeService);

  ngOnInit() {
    this.#route.params
      .pipe(
        switchMap((p) => {
          if (!p.hasOwnProperty('id')) {
            return of(new Bike());
          }
          return this.#bikeService.getOne(p['id']);
        })
      )
      .subscribe({
        next: (bike: any) => {
          this.bike = bike;
          this.feedback = {};
        },
        error: (err) => {
          this.feedback = { type: 'warning', message: 'Error loading' };
        },
      });
  }

  save() {
    this.#bikeService.save(this.bike).subscribe({
      next: (bike: any) => {
        this.bike = bike;
        this.feedback = { type: 'success', message: 'Save was successful!' };
        setTimeout(async () => {
          await this.#router.navigate(['/bikes']);
        }, 1000);
      },
      error: (err) => {
        this.feedback = { type: 'warning', message: 'Error saving' };
      },
    });
  }

  async cancel() {
    await this.#router.navigate(['/bikes']);
  }
}
