import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from '@angular/core';

export type FileType = 'csv' | 'json' | 'parquet' | 'excel';

@Component({
  selector: 'app-sound-upload',
  templateUrl: './sound-upload.component.html',
  styleUrls: ['./sound-upload.component.scss'],
})
export class SoundUploadComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  @Input() disabled: boolean = false;
  @Input() acceptedFileTypes: string = '';
  @Input() forceFileType: FileType = null;
  @Output() selectFiles: EventEmitter<FileList> = new EventEmitter();
  @Output() openFileDialog: EventEmitter<void> = new EventEmitter();

  selectedFiles: FileList = null;

  constructor() {}

  // Get the upload text guide based on force file type to upload
  get forceTypeName(): string {
    return `${this.forceFileType?.toUpperCase()} file(s)`;
  }

  ngOnInit() {}

  reset() {
    this.selectedFiles = null;
    this.selectFiles.emit();
  }

  onClicked() {
    this.openFileDialog.emit();
  }

  clearInput() {
    this.fileInput.nativeElement.value = '';
  }

  onFilesSelected(selectedFiles: FileList) {
    const arrFileTypeAccept: string[] = this.acceptedFileTypes
      .replace(/\s+/g, '')
      .split(',');

    const isAcceptedFileTypes = Array.from(selectedFiles).every(({ name }) => {
      const fileType = name.substr(name.lastIndexOf('.'), name.length);
      return arrFileTypeAccept.some((acceptType) => acceptType === fileType);
    });

    if (isAcceptedFileTypes) {
      this.selectedFiles = selectedFiles;
      this.selectFiles.emit(selectedFiles);
    } else {
      /* this.toastService.showErrorMessage(
        'Incorrect file type',
        `Please only use these file extensions: ${this.acceptedFileTypes}`
      );*/
    }
  }
}
