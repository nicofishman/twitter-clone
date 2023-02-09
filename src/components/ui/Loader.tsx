import React, { FC } from 'react';

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
    return (
        <svg className='h-8 w-8 animate-spin-fast'>
            <circle
                cx='16'
                cy='16'
                fill='none'
                r='14'
                strokeWidth='4'
                style={{ stroke: 'rgb(29, 161, 242)', opacity: 0.2 }}
            />
            <circle
                cx='16'
                cy='16'
                fill='none'
                r='14'
                strokeWidth='4'
                style={{
                    stroke: 'rgb(29, 161, 242)',
                    strokeDasharray: 80,
                    strokeDashoffset: 60,
                }}
            />
        </svg>
    );
};

export default Loader;
