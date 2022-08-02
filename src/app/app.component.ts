import { Component } from '@angular/core';
import { AppService } from './app.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  celulares:any [] = [];
  
  mensaje: FormControl = this.fb.control('',[ Validators.required]);
  loading: boolean = false;

  constructor(
    private appService: AppService,
    private fb: FormBuilder
  ) {}

  onFileChange(event:any) {
    let workBook:any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      if (jsonData.celulares) {
        this.celulares = jsonData.celulares.map((value: any) => ({ nombre: value.Nombre, celular: value.Celular, archivo: value.Archivo}));
      }
    }
    reader.readAsBinaryString(file);
  }

  sendMessage() {
    this.loading = true;
    this.celulares.forEach((el: any) => {
        const data = {
          // message: `Hola ${el.nombre}, prueba de mensaje massivo`,
          message: this.mensaje.value,
          fileName: el.archivo,
          number: `51${el.celular}`
        }
        this.appService.message(data).subscribe(res => {
          this.loading = false;
        });
    });
  }

  clear() {
    this.celulares = [];
  }

}
