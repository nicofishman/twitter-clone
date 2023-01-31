/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';

function twFactory(element: any) {
    return ([className, ..._a]: TemplateStringsArray) => {
        return restyle(element)(() => className!);
    };
}

type ClassnameFactory<T> = (s: TemplateStringsArray) => T;

type TailwindFactory = {
    [K in keyof JSX.IntrinsicElements]: ClassnameFactory<
        React.ForwardRefExoticComponent<JSX.IntrinsicElements[K]>
    >;
} & {
    <T>(c: T): ClassnameFactory<T>;
};

// eslint-disable-next-line no-undef
export const tw = new Proxy((() => {}) as unknown as TailwindFactory, {
    get: (_, property: string) => twFactory(property),
    apply: (_, __, [el]: [React.ReactElement]) => twFactory(el),
});

export const restyle = <
    T extends
        | string
        | React.FunctionComponent<{ className: string }>
        | React.ComponentClass<{ className: string }>,
>(
    element: T,
) => {
    return (cls: () => string) =>
        // eslint-disable-next-line react/display-name
        React.forwardRef(({ className, ...props }: any, ref) =>
            React.createElement(element, {
                ...props,
                className: clsx(cls(), className),
                ref,
            }),
        );
};
