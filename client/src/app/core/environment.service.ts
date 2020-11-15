import { Inject, Injectable } from '@angular/core';

@Injectable()
export abstract class EnvironmentService {
  abstract isProduction(): boolean;
  abstract get serverUrl(): string;
}
