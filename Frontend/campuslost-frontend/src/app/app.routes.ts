import { Routes } from '@angular/router';

import { Bienvenida } from './bienvenida/bienvenida';
import { Crud } from './crud/crud';
import { Categorias } from './categorias/categorias';
import { Estados } from './estados/estados';
import { Roles } from './roles/roles';
import { Usuarios } from './usuarios/usuarios';
import { Objetos } from './objetos/objetos';

export const routes: Routes = [
	{ path: '', component: Bienvenida, pathMatch: 'full' },
	{ path: 'crud', component: Crud },
	{ path: 'crud/categorias', component: Categorias },
	{ path: 'crud/estados', component: Estados },
	{ path: 'crud/roles', component: Roles },
	{ path: 'crud/usuarios', component: Usuarios },
	{ path: 'objetos', component: Objetos },
	{ path: '**', redirectTo: '' },
];
