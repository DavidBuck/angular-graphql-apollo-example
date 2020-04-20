import { TestBed } from '@angular/core/testing';

import { GraphqlServerService } from './graphql-server.service';

describe('GraphqlServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqlServerService = TestBed.get(GraphqlServerService);
    expect(service).toBeTruthy();
  });
});
