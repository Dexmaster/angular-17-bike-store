import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from '@components/confirm/confirm.component';
import { SnackbarService } from '@shared/snackbar/snackbar.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  combineLatestWith,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs';
import { Bike } from '../bike.model';
import { BikeService } from '../bike.service';
import { CardImageComponent } from '@components/card-image/card-image.component';

@Component({
  selector: 'app-bikes-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
    MatSortModule,
    CardImageComponent,
  ],
  templateUrl: './bikes-list.component.html',
  styleUrl: './bikes-list.component.scss',
})
export default class BikesListComponent implements AfterViewInit {
  displayedColumns = [
    'id',
    'imageUrl',
    'title',
    'type',
    'color',
    'price',
    'quantity',
    'rating',
    'actions',
  ];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageIndex = signal(0);
  public pageSize = signal(20);
  public totalItems = signal(0);
  public dataSource = new MatTableDataSource();
  public isLoading = signal(false);
  public search = new BehaviorSubject('');
  public lastIndex = computed(() =>
    this.totalItems() > 0
      ? Math.ceil(this.totalItems() / this.pageSize()) - 1
      : 0
  );

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  readonly #destroyRef = inject(DestroyRef);
  readonly #bikeService = inject(BikeService);
  readonly #dialog = inject(MatDialog);
  readonly #snack = inject(SnackbarService);

  get bikeList(): Bike[] {
    return this.#bikeService.bikeList;
  }

  constructor() {
    effect(
      () => {
        // if ever pageIndex will be larger than lastIndex set it to lastIndex value
        if (this.pageIndex() > this.lastIndex()) {
          this.pageIndex.set(this.lastIndex());
        }
      },
      { allowSignalWrites: true }
    );
    effect(
      () => {
        // paginator doesn't like programmatic setting of index and values, this is a fix
        this.paginator.page.next({
          pageIndex: this.pageIndex(),
          pageSize: this.pageSize(),
          length: this.totalItems(),
        });
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  public onPaginateChange(event: any): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  public onSearch(query: string): void {
    this.search.next(query);
  }

  public doDataRefresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  getData(): void {
    combineLatest([
      this.search.pipe(
        distinctUntilChanged(),
        tap(() => this.isLoading.set(true)),
        // we want to wait 1s before doing request
        // plus gives us feeling of longer requests to showcase a spinner
        throttleTime(1000, undefined, { trailing: true })
      ),
      this.sort.sortChange.asObservable().pipe(startWith(this.sort)),
    ])
      .pipe(
        // unsubscribe on destroy
        takeUntilDestroyed(this.#destroyRef),
        combineLatestWith(
          this.paginator.page.asObservable().pipe(startWith(this.paginator))
        ),
        tap(() => this.isLoading.set(true)),
        // small throttle to limit request frequency
        throttleTime(150, undefined, { trailing: true }),
        switchMap(([[search, sort], paginator]) =>
          this.#bikeService.getList(
            sort.active,
            sort.direction,
            paginator.pageSize,
            this.pageIndex() + 1,
            search
          )
        ),
        catchError(() => {
          return of({ data: [], total: 0 });
        }),
        map((data: any) => {
          this.isLoading.set(false);
          this.totalItems.set(data.total);
          this.dataSource.data = data.data;
        })
      )
      .subscribe();
  }

  delete(bike: Bike): void {
    const dialogRef = this.#dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Delete record',
        message: `Are you sure you want to delete bike #${bike.id}?`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(() => this.#bikeService.delete(bike.id))
      )
      .subscribe((res) => {
        this.#snack.success(`Bike #${bike.id} Removed successfully.`);
        this.doDataRefresh();
      });
  }
}
