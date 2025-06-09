import { Routes } from '@angular/router';
import { ListarProducto } from './components/listar-producto/listar-producto';
import { CrearProducto } from './components/crear-producto/crear-producto';
import { EditarProducto } from './components/editar-producto/editar-producto';

export const routes: Routes = [
  {
    path: '',
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
