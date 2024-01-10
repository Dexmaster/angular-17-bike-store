import { TestBed } from '@angular/core/testing';
import { BikeService } from './bike.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BikeService', () => {
  let service: BikeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BikeService]
    });

    service = TestBed.get(BikeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
