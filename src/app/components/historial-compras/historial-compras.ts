import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Compra } from '../../../Entidad/Compra';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ws } from '../../service/ws';
import { Producto } from '../../../Entidad/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-compras',
  imports: [MatTableModule, CommonModule],
  templateUrl: './historial-compras.html',
  styleUrl: './historial-compras.css',
})
export class HistorialCompras implements AfterViewInit {
  displayedColumns: string[] = [
    'idCompra',
    'idUsuario',
    'fechaCompra',
    'fechaEntrega',
    'status',
  ];

  producto = new Producto();
  compras: Compra[] = [];
  @Output() close = new EventEmitter<void>();
  dataSource!: MatTableDataSource<Compra>;
  cargando = true;

  constructor(private service: Ws) {}

  ngAfterViewInit(): void {
    this.listarCompras();
  }

  listarCompras() {
    this.service
      .listarComprasProd(Number(localStorage.getItem('productoId')))
      .subscribe((data) => {
        this.compras = data;
        this.dataSource = new MatTableDataSource(this.compras);
        this.cargando = false;
      });
  }

  onClose() {
    this.close.emit();
  }
}
