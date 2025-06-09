import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../Entidad/Producto';

@Injectable({
  providedIn: 'root',
})
export class Ws {
  constructor(private http: HttpClient) {}
  urlProducto = 'http://localhost:9000/producto';

  // CRUD DE PRODUCTO
  listarProducto() {
    return this.http.get<Producto[]>(this.urlProducto + '/listar');
  }

  guardarProducto(producto: Producto) {
    return this.http.post<String>(this.urlProducto + '/guardar', producto);
  }

  actualizarProducto(producto: Producto) {
    return this.http.put<String>(this.urlProducto + '/editar', producto);
  }

  eliminarProducto(producto: Producto) {
    return this.http.delete<void>(this.urlProducto + '/eliminar', {
      body: producto,
    });
  }

  buscarProducto(producto: Producto) {
    return this.http.post<Producto>(this.urlProducto + '/buscar', producto);
  }
}
