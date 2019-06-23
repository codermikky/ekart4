import { TestBed, inject } from '@angular/core/testing';

import { ShippingCartService } from './shopping-cart.service';

describe('ShippingCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingCartService]
    });
  });

  it('should be created', inject([ShippingCartService], (service: ShippingCartService) => {
    expect(service).toBeTruthy();
  }));
});
