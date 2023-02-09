import type { ImageProps } from 'next/image';

import React, { FC } from 'react';
import Image from 'next/image';
import { TwitterUser } from '@prisma/client';

interface AvatarProps extends Omit<ImageProps, 'alt' | 'src'> {
    user: TwitterUser;
}

const Avatar: FC<AvatarProps> = ({ width, user, ...rest }) => {
    const w = width ?? 40;

    if (user.id === '') {
        return (
            <div
                className='aspect-square h-fit rounded-full bg-gray-300'
                style={{ width: w, height: w }}
            />
        );
    }

    return (
        <Image
            alt={`${user.username}'s profile picture`}
            className='aspect-square h-fit rounded-full'
            height={w}
            src={user.image ?? `https://via.placeholder.com/${w}`}
            width={w}
            {...rest}
        />
    );
};

export default Avatar;
