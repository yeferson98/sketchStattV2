import { TestBed, inject } from '@angular/core/testing';

import { RestApiBackendService } from './rest-api-backend.service';

describe('RestApiBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[RestApiBackendService]
    })
  });

  it('should be created', inject([RestApiBackendService],(service:RestApiBackendService)=>{
    expect(service).toBeTruthy();
  }));
});
