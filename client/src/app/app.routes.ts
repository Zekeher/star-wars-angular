import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './viewStarWars/view.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', component: HomeComponent, data: {title: 'Home Page'}},
    { path: 'view/:name', component: ViewComponent, data: {title: 'View Page'}},
    { path: '**', component: LoginComponent, data: {title: 'Error Page'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}