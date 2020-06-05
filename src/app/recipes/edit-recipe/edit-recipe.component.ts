import { AuthService } from "./../../services/auth.service";
import { Recipe } from "./../../models/recipe.model";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.component.html",
  styleUrls: ["./edit-recipe.component.css"],
})
export class EditRecipeComponent implements OnInit {
  editRecipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Recipe
  ) {}

  ngOnInit() {
    this.editRecipeForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description, Validators.required],
      image: [this.data.image, Validators.required],
    });
  }

  onSubmit() {
    this.authService.updateRecipe({
      ...this.data,
      ...this.editRecipeForm.value,
    });
  }
}
