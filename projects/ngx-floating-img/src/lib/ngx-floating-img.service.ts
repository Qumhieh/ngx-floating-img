import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxFloatingImgService {

  constructor() { }

  public validateInputs (): boolean {
    return true;
  }

  public getImgRatio (imgWidth: number, imgHeight: number): number {
    return (imgHeight / imgWidth) * 100;
  }

}
