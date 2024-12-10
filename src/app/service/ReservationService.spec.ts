import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationService } from './ReservationService';
import { Reservation } from '../model/Reservation';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService],
    });
    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a reservation (addReservation)', () => {
    const newReservation: Reservation = {
      utilisateurId: 1,
      jeuxId: 42,
      reservation: 3,
    };

    service.addReservation(newReservation).subscribe((reservation) => {
      expect(reservation).toEqual(newReservation);
    });

    const req = httpMock.expectOne(`${service.API_URL}/reservation`);
    expect(req.request.method).toBe('POST');
    req.flush(newReservation); // Simulate the response with the new reservation data
  });



  it('should get a reservation by ID (getReservationById)', () => {
    const reservationId = 1;
    const mockReservation: Reservation = {
      utilisateurId: 1,
      jeuxId: 2,
      reservation: 3,
    };

    service.getReservationById(reservationId).subscribe((reservation) => {
      expect(reservation).toEqual(mockReservation);
    });

    const req = httpMock.expectOne(`${service.API_URL}/reservation/${reservationId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservation); // Simulate the response with the mock reservation data
  });

  it('should get reservations by user ID (getReservationByUser)', () => {
    const userId = 1;
    const mockReservations: Reservation[] = [
      {
        utilisateurId: 1,
        jeuxId: 40,
        reservation: 0,
      },
    ];

    service.getReservationByUser(userId).subscribe((reservations) => {
      expect(reservations).toEqual(mockReservations);
    });

    const req = httpMock.expectOne(`${service.API_URL}/reservation/utilisateur/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservations); // Simulate the response with the mock reservations data
  });

  it('should get reservations by game ID (getReservationByJeux)', () => {
    const jeuxId = 40;
    const mockReservations: Reservation[] = [
      {
        utilisateurId: 1,
        jeuxId: 40,
        reservation: 0,
      },
    ];

    service.getReservationByJeux(jeuxId).subscribe((reservations) => {
      expect(reservations).toEqual(mockReservations);
    });

    const req = httpMock.expectOne(`${service.API_URL}/reservation/jeux/${jeuxId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservations); // Simulate the response with the mock reservations data
  });

  it('should update a reservation (updateReservation)', () => {
    const updatedReservation: Reservation = {
      utilisateurId: 1,
      jeuxId: 40,
      reservation: 5, // Updated reservation quantity
    };

    service.updateReservation(updatedReservation).subscribe((reservation) => {
      expect(reservation).toEqual(updatedReservation);
    });

    const req = httpMock.expectOne(
      `${service.API_URL}/reservation/${updatedReservation.utilisateurId}/${updatedReservation.jeuxId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedReservation); // Simulate the response with the updated reservation data
  });

  it('should delete a reservation (deleteReservation)', () => {
    const reservationId = 1;

    service.deleteReservation(reservationId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.API_URL}/reservation/${reservationId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate the response as null to signify successful deletion
  });
});
