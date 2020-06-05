import { Recipe } from "./../models/recipe.model";
import { AddRecipeComponent } from "./../recipes/add-recipe/add-recipe.component";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { ShowRecipeComponent } from "../recipes/show-recipe/show-recipe.component";
import { listAnimation } from '../animations/listAnimation.animation';

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"],
  animations: [ listAnimation ]
})
export class UserDashboardComponent implements OnInit {
  title: string;
  description: string;
  userRecipes: Recipe[];
  searchResult: Recipe[];

  constructor(
    public authService: AuthService,
    private dialog: MatDialog // @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.authService.getUserRecipes().subscribe((userRecipes) => {
          this.userRecipes = userRecipes;
          this.searchResult = userRecipes;
        });
      } else return; 
    });
    // console.log(this.authService.userId);
  }

  onAddRecipe() {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: "500px",
      height: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.authService.addRecipe(result);
    });
  }

  onViewRecipe(recipe: Recipe) {
    const dialogRef = this.dialog.open(ShowRecipeComponent, {
      // width: "500px",
      // height: "500px",
      data: recipe,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.authService.addRecipe(result);
    // });
  }

  onDeleteRecipe(recipe: Recipe) {
    this.authService.deleteRecipe(recipe);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
    this.userRecipes = this.searchResult.filter((recipe) => {
      return recipe.title.includes(filterValue);
    });
  }
}
