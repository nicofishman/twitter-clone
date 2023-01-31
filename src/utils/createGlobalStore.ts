import { SetStateAction, useCallback } from 'react';
import { create } from 'zustand';

export type EqualityFn<T> = (
    left: T | null | undefined,
    right: T | null | undefined,
) => boolean;

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (fn: unknown): fn is Function => typeof fn === 'function';

/** Given a type `T`, returns the keys that are Optional. */
type OptionalKeys<T> = string extends keyof T
    ? string
    : {
          [K in keyof T]-?: Record<string, unknown> extends Pick<T, K>
              ? K
              : never;
      }[keyof T];

/**
 * Create a global state
 *
 * It returns a set of functions
 * - `use`: Works like React.useState. "Registers" the component as a listener on that key
 * - `get`: retrieves a key without a re-render
 * - `set`: sets a key. Causes re-renders on any listeners
 * - `getAll`: retrieves the entire state (all keys) as an object without a re-render
 * - `reset`: resets the state back to its initial value
 *
 * @example
 * import { createStore } from 'create-store';
 *
 * const store = createStore({ count: 0 });
 *
 * const Component = () => {
 *   const [count, setCount] = store.use('count');
 *   ...
 * };
 */
export const createGlobalStore = <State extends object>(
    initialState: State,
) => {
    const store = create<State>(() => structuredClone(initialState));

    const setter = <T extends keyof State>(
        key: T,
        value: SetStateAction<State[T]>,
    ) => {
        if (isFunction(value)) {
            store.setState(
                (prevValue) =>
                    ({
                        [key]: value(prevValue[key]),
                    } as unknown as Partial<State>),
            );
        } else {
            store.setState({ [key]: value } as unknown as Partial<State>);
        }
    };

    return {
        use<K extends keyof State>(
            key: K,
            defaultValue?: State[K],
            equalityFn?: EqualityFn<State[K]>,
        ): [State[K], (value: SetStateAction<State[K]>) => void] {
            // If state isn't defined for a given defaultValue, set it.
            if (defaultValue !== undefined && !(key in store.getState())) {
                setter(key, defaultValue);
            }
            const result = store((state) => state[key], equalityFn);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const keySetter = useCallback(
                (value: SetStateAction<State[K]>) => setter(key, value),
                [key],
            );

            return [result, keySetter];
        },
        useAll: () => store((state) => state),
        delete<K extends OptionalKeys<State>>(key: K) {
            store.setState((prevState) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
                const { [key]: _, ...rest } = prevState;

                return rest as State;
            }, true);
        },
        get<K extends keyof State>(key: K) {
            return store.getState()[key];
        },
        getAll: () => store.getState(),
        set: setter,
        setAll: (state: State) => store.setState(state, true),
        update: (state: Partial<State>) => store.setState(state, false),
        reset: () => store.setState(structuredClone(initialState), true),
    };
};
