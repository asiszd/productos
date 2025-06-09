import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../Entidad/Producto';
import { Ws } from '../../service/ws';
import { Router } from '@angular/router';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HistorialCompras } from '../historial-compras/historial-compras';

@Component({
  selector: 'app-listar-producto',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    MatFabButton,
    MatTabsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardContent,
    CurrencyPipe,
    HistorialCompras,
    CommonModule,
  ],
  templateUrl: './listar-producto.html',
  styleUrl: './listar-producto.css',
})
export class ListarProducto implements AfterViewInit {
  displayedColumns: string[] = [
    'idProducto',
    'nombre',
    'marca',
    'modelo',
    'precio',
    'stock',
    'proveedorId',
    'editar',
    'eliminar',
    'compras',
  ];
  productos: Producto[] = [];
  dataSource!: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isModalOpen = false;

  constructor(private service: Ws, private router: Router) {}

  ngAfterViewInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.service.listarProducto().subscribe((data) => {
      this.productos = data;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtroNombre(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(producto: Producto) {
    localStorage.setItem('idProducto', producto.idProducto.toString());
    this.router.navigate(['editar']);
  }

  crear() {
    this.router.navigate(['crear']);
  }

  openModal(producto: Producto) {
    localStorage.setItem('productoId', producto.idProducto.toString());
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  eliminar(producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el producto <b>' + producto.nombre + '</b>?',
      text: 'Esta acción no se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarProducto(producto).subscribe(
          (data) => {
            Swal.fire({
              title:
                'Se ha eliminado al usuario ' +
                producto.nombre +
                ' correctamente!',
              icon: 'success',
              timer: 3500,
            });
            this.listarProductos();
          },
          (error) => {
            Swal.fire({
              title: 'Ocurrió un error!',
              icon: 'error',
              text:
                'El producto ' + producto.nombre + ' no se ha podido eliminar!',
              showConfirmButton: false,
              timer: 4500,
            });
          }
        );
      }
    });
  }
}
