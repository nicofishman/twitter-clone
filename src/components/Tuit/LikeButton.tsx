import React, { FC } from 'react';
import clsx from 'clsx';

import Icon  from '@/components/ui/Icon';

import { TuitButton } from '../index/Tuit';

interface LikeButtonProps {
    doLike: () => void;
    isLiked: boolean;
    likes: number;
}

const LikeButton: FC<LikeButtonProps> = ({ doLike, isLiked, likes }) => {
    const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        e.preventDefault(); 
        doLike();
    };

    return (
        <div className='flex gap-x-px items-center group'>
            <TuitButton tooltip='like' onClick={(e) => handleLike(e)}>
                <Icon 
                    className={clsx(
                        'group-hover:text-redLike duration-200 transition-colors w-5',
                        isLiked ? 'text-redLike' : 'text-textGray'
                    )} 
                    name={
                        isLiked ? 'heartFill' : 'heart'
                    }
                />
            </TuitButton>
            <span className='text-textGray text-sm group-hover:text-redLike'>{likes > 0 && likes}</span>
        </div>
    );
};

export default LikeButton;
