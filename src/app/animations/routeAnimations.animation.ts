import {
  trigger,
  transition,
  style,
  animate,
  query,
  animateChild,
} from "@angular/animations";

export const routeAnimations = trigger("routeAnimations", [
  transition("RecipesPage <=> Dashboard", [
    query(":enter", [
      style({ opacity: 0 }),
      animate("1s ease-in-out", style({ opacity: 1 })),
    ]),
  ]),
  transition("* => *", [
    query(":enter", [
      style({
        opacity: 0,
      }),
      animate(
        "1s ease-in-out",
        style({ opacity: 1 })
      ),
    ]),
  ]),
]);
