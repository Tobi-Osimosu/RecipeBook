import { MaterialModule } from "./material/material.module";
import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthComponent } from "./auth/auth.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { AddRecipeComponent } from "./recipes/add-recipe/add-recipe.component";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShowRecipeComponent } from "./recipes/show-recipe/show-recipe.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UserDashboardComponent,
    RecipesComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    ShowRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  entryComponents: [
    AddRecipeComponent,
    EditRecipeComponent,
    ShowRecipeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
