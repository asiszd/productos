import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../Entidad/Producto';
import { Ws } from '../../service/ws';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
    MatTabsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardContent,
    FormsModule,
    CommonModule,
    MatCardActions,
    MatFabButton,
  ],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css',
})
export class EditarProducto implements OnInit {
  producto = new Producto();

  constructor(private service: Ws, private router: Router) {}

  ngOnInit(): void {
    this.buscarProducto();
  }

  buscarProducto() {
    this.producto.idProducto = Number(localStorage.getItem('idProducto'));

    this.service.buscarProducto(this.producto).subscribe((data) => {
      this.producto = data;
    });
  }

  regresar() {
    this.router.navigate(['']);
  }

  validaNumeros(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete', // navegación y punto
    ];

    // Permitir números
    if (
      (event.key >= '0' && event.key <= '9') ||
      allowedKeys.includes(event.key)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }

  validaDouble(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      '.',
    ];

    if (
      (event.key >= '0' && event.key <= '9') ||
      allowedKeys.includes(event.key)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }

  actualizar() {
    this.service.actualizarProducto(this.producto).subscribe(
      (data) => {
        Swal.fire({
          title: '¡Actualizado!',
          icon: 'success',
          text:
            'Se ha actualizado correctamente el producto ¡' +
            this.producto.marca +
            ' ' +
            this.producto.nombre +
            '!',
          showConfirmButton: false,
          timer: 3500,
        });
        this.router.navigate(['']);
      },
      (error) => {
        Swal.fire({
          title: 'Ocurrió un error!',
          icon: 'error',
          text: JSON.stringify(error.error.mensaje),
          showConfirmButton: false,
          timer: 3500,
        });
      }
    );
  }
}
