import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.component.html",
  styleUrls: ["./add-recipe.component.css"],
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRecipeComponent>
  ) {}

  ngOnInit() {
    this.addRecipeForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.addRecipeForm.value);
  }
}
