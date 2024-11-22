import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JeuxService } from './JeuxService';
import { Jeux } from '../model/Jeux';

describe('JeuxService', () => {
  let service: JeuxService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JeuxService]
    });
    service = TestBed.inject(JeuxService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a game by ID (getJeuxById)', () => {
    // @ts-ignore
    const j: Jeux = { id: 38,
      nom: 'Vivaria, Duo et Biky',
      quantite: 3,
      description: 'LAC DE LA BERGEONNERIE',
      pointGeo: '47.3688493669, 0.6941214246' };

    service.getJeuxById(38).subscribe(jeu => {
      expect(jeu).toEqual(j);
    });

    const req = httpMock.expectOne(`${service.API_URL}/38`);
    expect(req.request.method).toBe('GET');
    req.flush(j);
  });
});
