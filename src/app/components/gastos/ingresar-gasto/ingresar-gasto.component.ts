import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.scss']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto : string;
  cantidad : number;
  formularioIncorrecto : boolean;
  textoIncorrecto : string;

  constructor(private _presupuestoService : PresupuestoService) { 
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = true;
    this.textoIncorrecto = '';
  }

  ngOnInit(): void {
  }

  agregarGasto(){

    if(this.cantidad > this._presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada es mayor al restante'
      return;
    }

    if(this.nombreGasto === '' || this.cantidad <= 0){
      this.textoIncorrecto = 'Nombre gasto o cantidad incorrecta'
      this.formularioIncorrecto = true;
    } else {

      const GASTO = {
        nombre : this.nombreGasto,
        cantidad : this.cantidad
      }

      this._presupuestoService.agregarGasto(GASTO);

      this.nombreGasto = '';
      this.cantidad = 0;
      this.formularioIncorrecto = false;
    }
  }
}
