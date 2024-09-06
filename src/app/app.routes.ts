import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { AboutComponent } from './about/about.component';
import { ListTodoComponent } from './todo/list-todo/list-todo.component';
import { CreateTodoComponent } from './todo/create-todo/create-todo.component';
import { EditTodoComponent } from './todo/edit-todo/edit-todo.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'todo', component: ListTodoComponent, canActivate: [AdminGuard]},
    {path: 'todo/create', component: CreateTodoComponent, canActivate: [AdminGuard]},
    {path: 'todo/edit/:id', component: EditTodoComponent, canActivate: [AdminGuard]},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: ''},
    
];
