import type { ImageProps } from 'next/image';

import React, { FC } from 'react';
import Image from 'next/image';

interface AvatarProps extends ImageProps {
}

const Avatar: FC<AvatarProps> = ({ src, width, alt, ...rest }) => {
    const w = width ?? 40;
    
    if (!src) {
        return (
            <div className='rounded-full aspect-square h-fit bg-gray-300' style={{ width: w, height: w }} />
        );
    }

    return (
        <Image alt={alt} className='rounded-full aspect-square h-fit' height={w} src={src ?? `https://via.placeholder.com/${w}`} width={w} {...rest} />
    );
};

export default Avatar;
