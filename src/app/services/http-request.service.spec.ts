/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpRequestService } from './http-request.service';

describe('HttpRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRequestService]
    });
  });

  it('should ...', inject([HttpRequestService], (service: HttpRequestService) => {
    expect(service).toBeTruthy();
  }));
});
