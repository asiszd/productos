import { Routes } from '@angular/router';
import { Productos } from './components/productos/productos';
import { ListarProducto } from './components/productos/listar-producto/listar-producto';
import { CrearProducto } from './components/productos/crear-producto/crear-producto';
import { EditarProducto } from './components/productos/editar-producto/editar-producto';

export const routes: Routes = [
  {
    path: 'productos',
    component: Productos,
  },
  {
    path: 'listar',
    component: ListarProducto,
  },
  {
    path: 'crear',
    component: CrearProducto,
  },
  {
    path: 'editar',
    component: EditarProducto,
  },
];
