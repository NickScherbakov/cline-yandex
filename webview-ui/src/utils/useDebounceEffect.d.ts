type VoidFn = () => void;
/**
 * Runs `effectRef.current()` after `delay` ms whenever any of the `deps` change,
 * but cancels/re-schedules if they change again before the delay.
 */
export declare function useDebounceEffect(effect: VoidFn, delay: number, deps: any[]): void;
export {};
