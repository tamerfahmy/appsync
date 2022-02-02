import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CityService } from './city.service';
import { MessageService } from 'primeng';
import { AppSyncService } from './app-sync.service';
import { NotificationService } from './notification.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AppSyncService,
        MessageService,
        NotificationService,
      ]
    });
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
