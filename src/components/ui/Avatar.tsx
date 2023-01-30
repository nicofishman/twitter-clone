import type { ImageProps } from 'next/image';

import React, { FC } from 'react';
import Image from 'next/image';
import { TwitterUser } from '@prisma/client';

interface AvatarProps extends Omit<ImageProps, 'alt' | 'src'> {
    user: TwitterUser | null;
}

const Avatar: FC<AvatarProps> = ({ width, user, ...rest }) => {
    const w = width ?? 40;
    
    if (!user) {
        return (
            <div className='rounded-full aspect-square h-fit bg-gray-300' style={{ width: w, height: w }} />
        );
    }

    return (
        <Image alt={`${user.username}'s profile picture`} className='rounded-full aspect-square h-fit' height={w} src={user.image ?? `https://via.placeholder.com/${w}`} width={w} {...rest} />
    );
};

export default Avatar;
