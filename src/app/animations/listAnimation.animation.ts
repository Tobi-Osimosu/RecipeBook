import { trigger, transition, style, animate, sequence } from '@angular/animations';

export const listAnimation = trigger("listAnimation", [
    transition(":enter", [
      style({
        opacity: 0,
      }),
      animate("1s ease-in-out", style({ opacity: 1 })),
    ]),
    transition("* => *", [
      style({
        opacity: 0,
      }),
      animate("1s ease-in-out", style({ opacity: 1 })),
    ]),
  ]);