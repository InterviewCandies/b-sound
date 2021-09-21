import { NgModule } from '@angular/core';
import { EditorComponent } from './editor/editor.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [EditorComponent, FileUploadComponent, ToolbarComponent],
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  exports: [EditorComponent, FileUploadComponent],
})
export class SoundEditorModule {}
