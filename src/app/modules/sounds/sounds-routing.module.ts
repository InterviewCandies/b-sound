import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guards';
import { SoundProducerComponent } from './sound-producer/sound-producer.component';
import { SoundsCollectionComponent } from './sounds-collection/sounds-collection.component';
import { SoundsListComponent } from './sounds-list/sounds-list.component';
import { SoundsComponent } from './sounds.component';

export const SoundsRoutingModule: Routes = [
  {
    path: '',
    component: SoundsComponent,
    children: [
      { path: '', component: SoundsListComponent },
      {
        path: 'editor',
        component: SoundProducerComponent,
        canActivate: [AuthGuard],
      },
      { path: 'collection', component: SoundsCollectionComponent },
    ],
  },
];
