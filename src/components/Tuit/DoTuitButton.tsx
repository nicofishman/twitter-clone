import React from 'react';

import { cn } from '@/utils/cn';

interface DoTuitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    tuitContent: string;
    doTuit: () => void;
    children: React.ReactNode;
}

const DoTuitButton = ({
    doTuit,
    tuitContent,
    children,
    className,
    ...rest
}: DoTuitButtonProps) => {
    return (
        <button
            {...rest}
            className={cn(
                'rounded-full bg-twitterBlue px-3 py-1 transition-all duration-200 hover:bg-twitterBlueHover',
                'disabled:opacity-60 disabled:hover:bg-twitterBlue',
                className,
            )}
            disabled={tuitContent.length === 0}
            onClick={doTuit}
        >
            <span className="mx-3 text-base font-bold text-white">
                {children}
            </span>
        </button>
    );
};

export default DoTuitButton;
