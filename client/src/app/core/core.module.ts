import { ModuleWithProviders, NgModule } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { DefaultEnvironmentService } from './default-environment.service';

@NgModule()
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: EnvironmentService, useClass: DefaultEnvironmentService },
      ],
    };
  }
}
