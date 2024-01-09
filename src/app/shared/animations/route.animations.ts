import {
    animate,
    query,
    sequence,
    style,
    transition,
    trigger,
} from '@angular/animations';

const ANIMATION_STEPS: any[] = [
  query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
    optional: true,
  }),
  sequence([
    query(
      ':leave > *',
      [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate(
          '0.2s ease-in-out',
          style({ transform: 'translateY(-3%)', opacity: 0 })
        ),
        style({ position: 'fixed' }),
      ],
      { optional: true }
    ),
    query(
      ':enter > *',
      [
        style({
          transform: 'translateY(-3%)',
          opacity: 0,
          position: 'static',
        }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        ),
      ],
      { optional: true }
    ),
  ]),
];

export const routeAnimations = trigger('routeAnimations', [
  transition(isRouteAnimated, ANIMATION_STEPS),
]);

export function isRouteAnimated(from?: string, to?: string, element?: any, params?: any) {
  return from !== to;
}
