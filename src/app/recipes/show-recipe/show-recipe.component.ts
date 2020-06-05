import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { EditRecipeComponent } from "../edit-recipe/edit-recipe.component";
import { Recipe } from "src/app/models/recipe.model";
import { Router } from '@angular/router';

@Component({
  selector: "app-show-recipe",
  templateUrl: "./show-recipe.component.html",
  styleUrls: ["./show-recipe.component.css"],
})
export class ShowRecipeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Recipe
  ) {}

  ngOnInit() {}

  onEditRecipe() {
    const dialogRef = this.dialog.open(EditRecipeComponent, {
      width: "500px",
      height: "500px",
      data: this.data
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.router.navigate(["dashboard"]);
    // });
  }
}
