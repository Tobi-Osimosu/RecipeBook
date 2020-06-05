import { RecipesComponent } from "./recipes/recipes.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    data: { animation: "RecipesPage" },
  },
  { path: "auth", component: AuthComponent },
  {
    path: "dashboard",
    component: UserDashboardComponent,
    data: { animation: "Dashboard" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
