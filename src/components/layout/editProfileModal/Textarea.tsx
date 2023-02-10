import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { TwitterUser } from '@prisma/client';

import { cn } from '@/utils/cn';

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    name: keyof TwitterUser;
}

const Textarea = ({
    className,
    placeholder,
    name,
    ...props
}: TextareaProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div
            className={clsx(
                'relative w-full rounded-md border border-textGray',
                {
                    'border-twitterBlue': isFocused,
                },
            )}
        >
            <p
                className={clsx('absolute top-0 left-0 px-2 pt-2 text-xs', {
                    'text-twitterBlue': isFocused,
                    'text-textGray': !isFocused,
                })}
            >
                {placeholder}
            </p>
            {props.maxLength && (
                <p
                    className={clsx(
                        'absolute top-0 right-0 px-2 pt-2 text-xs text-textGray',
                        {
                            hidden: !isFocused,
                            block: isFocused,
                        },
                    )}
                >
                    {`${inputRef.current?.value.length} / ${props.maxLength}`}
                </p>
            )}

            <textarea
                ref={inputRef}
                name={name}
                {...props}
                className={cn(
                    'mt-4 w-full rounded-md bg-black px-2 pb-2 pt-3 text-white',
                    'focus:outline-none',
                    className,
                )}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
            />
        </div>
    );
};

export default Textarea;
