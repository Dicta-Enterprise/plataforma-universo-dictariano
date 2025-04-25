import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { FolderState } from 'src/app/shared/enums/folder.enum';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  uploadImage(file: File, folder: FolderState): Observable<any> {
    let direccion = `${this.base_url}az-upload/upload/${folder}`;

    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(direccion);

    return this.httpClient.post<any>(direccion, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
