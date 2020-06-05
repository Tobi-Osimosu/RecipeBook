import { Recipe } from "./../models/recipe.model";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ShowRecipeComponent } from "./show-recipe/show-recipe.component";
import { MatDialog } from "@angular/material";
import { listAnimation } from "../animations/listAnimation.animation"

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
  animations: [ listAnimation ]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  searchResult: Recipe[];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.authService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.searchResult = recipes;
    });
  }

  onViewRecipe(recipe: Recipe) {
    const dialogRef = this.dialog.open(ShowRecipeComponent, {
      data: recipe,
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
    this.recipes = this.searchResult.filter((recipe) => {
      return recipe.title.includes(filterValue);
    });
  }
}