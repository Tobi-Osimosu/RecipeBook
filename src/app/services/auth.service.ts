import { Recipe } from "./../models/recipe.model";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: Observable<User>;
  userId: string;
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipes: Observable<Recipe[]>;
  recipeDoc: AngularFirestoreDocument<Recipe>;
  userRecipeCollection: AngularFirestoreCollection<Recipe>;
  userRecipes: Observable<Recipe[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     console.log(this.user)
    //     localStorage.setItem("user", JSON.stringify(this.user));
    //     return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     localStorage.setItem("user", null);
    //     return of(null);
    //   }
    // });

    //Recipe
    this.recipesCollection = this.afs.collection(`recipes`, (ref) =>
      ref.orderBy("title", "asc")
    );

    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Recipe;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.userId = credential.user.uid;
    return [this.updateUserData(credential.user), this.UR(credential.user)];
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    return this.router.navigate(["/"]);
  }

  async login(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    // this.router.navigate(["dashboard"]);
    this.userId = credential.user.uid;
    return [this.updateUserData(credential.user), this.UR(credential.user)];
  }

  autoLogin() {
    const data: { uid: string } = JSON.parse(localStorage.getItem("user"));
    if (data) {
      return this.UR(data);
    } else {
      return;
    }
  }

  private UR(user) {
    // userRecipes and userRecipeCollection was in contructor before
    // but i moved it here because i needed the user id
    this.userRecipeCollection = this.afs.collection(`recipes`, (ref) =>
      ref.where("uid", "==", `${user.uid}`)
    );

    this.userRecipes = this.userRecipeCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Recipe;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  private updateUserData(user) {
    // set user in localstorage
    const userDetails = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    localStorage.setItem("user", JSON.stringify(userDetails));

    //sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  addRecipe(data) {
    //code to post recipe to firestore

    // const recipeRef: AngularFirestoreCollection<Recipe> = this.afs.collection(
    //   "recipes"
    // );

    const recipe = {
      title: data.title,
      description: data.description,
      image: data.image,
      uid: this.userId,
    };
    this.recipesCollection.add(recipe);
  }

  deleteRecipe(recipe) {
    this.recipeDoc = this.afs.doc(`recipes/${recipe.id}`);
    this.recipeDoc.delete();
  }

  updateRecipe(recipe: Recipe) {
    this.recipeDoc = this.afs.doc(`recipes/${recipe.id}`);
    this.recipeDoc.update(recipe);
  }

  getRecipes() {
    return this.recipes;
  }

  getUserRecipes() {
    return this.userRecipes;
  }
}
