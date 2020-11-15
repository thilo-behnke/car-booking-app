import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { environment } from '../../environments/environment';

@Injectable()
export class DefaultEnvironmentService implements EnvironmentService {
  isProduction(): boolean {
    return environment.production;
  }

  get serverUrl(): string {
    return environment.serverUrl;
  }
}
