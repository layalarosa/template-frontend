import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { AboutComponent } from './about/about.component';
import { ListTodoComponent } from './todo/list-todo/list-todo.component';
import { CreateTodoComponent } from './todo/create-todo/create-todo.component';
import { EditTodoComponent } from './todo/edit-todo/edit-todo.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'about', component: AboutComponent},
    {path: 'todo', component: ListTodoComponent},
    {path: 'todo/create', component: CreateTodoComponent},
    {path: 'todo/edit/:id', component: EditTodoComponent}
    
];
