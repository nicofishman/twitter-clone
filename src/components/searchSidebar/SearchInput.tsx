import React, { HTMLAttributes, useState } from 'react';

import { cn } from '@/utils/cn';

interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}

const SearchInput = ({
    startAdornment,
    endAdornment,
    className,
    ...props
}: SearchInputProps) => {
    const [search, setSearch] = useState('');
    const [focused, setFocused] = useState(false);

    return (
        <div
            className={cn(
                'relative flex w-full items-center rounded-full bg-darkGray',
                focused && 'border border-twitterBlue',
            )}
        >
            <div
                className={cn(
                    focused
                        ? '[&>svg]:text-twitterBlue'
                        : '[&>svg]:text-textGray',
                )}
            >
                {startAdornment}
            </div>
            <input
                className={cn(
                    'flex-1 bg-transparent p-3 text-textGray outline-none placeholder:text-textGray',
                    className,
                )}
                placeholder='Search Twitter'
                value={search}
                onBlur={() => setFocused(false)}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                {...props}
            />
            {endAdornment}
        </div>
    );
};

export default SearchInput;
