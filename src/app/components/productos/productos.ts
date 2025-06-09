import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
} from '@angular/core';
import { CrearProducto } from './crear-producto/crear-producto';
import { ListarProducto } from './listar-producto/listar-producto';
import { EditarProducto } from './editar-producto/editar-producto';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-productos',
  imports: [MatTabsModule, MatCard, MatCardHeader, MatCardTitle],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements AfterViewInit {
  @ViewChild('listarProducto', { read: ViewContainerRef })
  contenedorTab1!: ViewContainerRef;
  @ViewChild('crearProducto', { read: ViewContainerRef })
  contenedorTab2!: ViewContainerRef;
  @ViewChild('editarProducto', { read: ViewContainerRef })
  contenedorTab3!: ViewContainerRef;

  // Variables
  tabActual: number = 0;

  // implementacion de AfterViewInit
  ngAfterViewInit(): void {
    this.cargarTabs(0);
  }

  cargarTabs(index: number) {
    this.limpiarTab(this.tabActual);
    switch (index) {
      case 0:
        this.contenedorTab1.createComponent(ListarProducto);
        break;
      case 1:
        this.contenedorTab2.createComponent(CrearProducto);
        break;
      case 2:
        this.contenedorTab3.createComponent(EditarProducto);
        break;
    }
    this.tabActual = index;
  }

  limpiarTab(index: number) {
    switch (index) {
      case 0:
        this.contenedorTab1.clear();
        break;
      case 1:
        this.contenedorTab2.clear();
        break;
      case 2:
        this.contenedorTab3.clear();
        break;
    }
  }
}
