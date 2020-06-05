import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatRippleModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatTableModule,
} from "@angular/material";

const Material = [
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatRippleModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatTableModule
];
@NgModule({
  imports: [Material],
  exports: [Material],
})
export class MaterialModule {}
