import { Routes } from 'nest-router';
import { similarModule } from './similar/similar.module';
import { statModule } from './stat/stat.module';

export const routes: Routes = [
  {
    path: 'api/v1',
    module: similarModule,
  },
  {
    path: 'api/v1',
    module: statModule,
  },
];
