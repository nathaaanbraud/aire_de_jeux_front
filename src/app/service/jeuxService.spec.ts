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
      console.log('Objet reçu :', jeu);
      expect(jeu).toEqual(j);
    });

    const req = httpMock.expectOne(`${service.API_URL}/${service.API_ENTITY_NAME}/38`);
    expect(req.request.method).toBe('GET');
    req.flush(j);
  });

  it('should add a new game ', () => {
    const newJeux: Jeux = { id: 0,
      nom: 'New Game',
      quantite: 5,
      description: 'New Description',
      pointGeo: 'New Point' };

    service.addJeux(newJeux).subscribe(jeu => {
      console.log('Added game:', jeu);
      expect(jeu).toEqual(newJeux);
    });

    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newJeux);
    req.flush(newJeux);
  });

  // Test de suppression d'un jeu
  it('should delete a game by ID (deleteJeux)', () => {
    const gameId = 38;

    service.deleteJeux(gameId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.API_URL}/${service.API_ENTITY_NAME}/38`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // Test de mise à jour d'un jeu
  it('should update a game (updateJeux)', () => {
    const updatedGame: Jeux = {
      id: 38,
      nom: 'Updated Game',
      quantite: 7,
      description: 'Updated Description',
      pointGeo: 'Updated Point',
    };

    service.updateJeux(updatedGame).subscribe(game => {
      expect(game).toEqual(updatedGame);
    });

    const req = httpMock.expectOne(`${service.API_URL}/${service.API_ENTITY_NAME}/${updatedGame.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedGame);
    req.flush(updatedGame);
  });

});
