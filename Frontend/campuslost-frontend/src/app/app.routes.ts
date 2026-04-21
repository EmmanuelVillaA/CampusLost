import { Routes } from '@angular/router';

import { Bienvenida } from './bienvenida/bienvenida';
import { Crud } from './crud/crud';
import { Categorias } from './categorias/categorias';
import { Estados } from './estados/estados';
import { Roles } from './roles/roles';
import { Usuarios } from './usuarios/usuarios';
import { Objetos } from './objetos/objetos';
import { inicio } from './Inicio/inicio';
import { auth } from './auth/auth';



export const routes: Routes = [

  /* LOGIN */
  {
    path: '',
    component: Bienvenida,
    pathMatch: 'full'
  },

  /* DASHBOARD */
  {
    path: 'inicio',
    component: inicio,
    canActivate: [auth]
  },

  /* CRUD */
  {
    path: 'crud',
    component: Crud,
    canActivate: [auth]
  },

  {
    path: 'crud/categorias',
    component: Categorias,
    canActivate: [auth]
  },

  {
    path: 'crud/estados',
    component: Estados,
    canActivate: [auth]
  },

  {
    path: 'crud/roles',
    component: Roles,
    canActivate: [auth]
  },

  {
    path: 'crud/usuarios',
    component: Usuarios,
    canActivate: [auth]
  },

  {
    path: 'objetos',
    component: Objetos,
    canActivate: [auth]
  },

  {
    path: '**',
    redirectTo: ''
  }

];