import { Routes } from '@angular/router';
import { EditorComponent } from '../modules/sound-editor/editor/editor.component';
import { SoundsCollectionComponent } from '../modules/sounds/sounds-collection/sounds-collection.component';
import { SoundsListComponent } from '../modules/sounds/sounds-list/sounds-list.component';
import { SoundsComponent } from '../modules/sounds/sounds.component';

export const SoundsRoutingModule: Routes = [
  {
    path: '',
    component: SoundsComponent,
    children: [
      { path: '', component: SoundsListComponent },
      { path: 'editor', component: EditorComponent },
      { path: 'collection', component: SoundsCollectionComponent },
    ],
  },
];
