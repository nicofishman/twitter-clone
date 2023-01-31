import React, { FC } from 'react';
import clsx from 'clsx';

import Icon from '@/components/ui/Icon';

import { TuitButton } from '../index/Tuit';

interface LikeButtonProps {
    doLike: () => void;
    isLiked: boolean;
    likes: number;
}

const LikeButton: FC<LikeButtonProps> = ({ doLike, isLiked, likes }) => {
    const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        doLike();
    };

    return (
        <div className="group flex items-center gap-x-px">
            <TuitButton tooltip="like" onClick={(e) => handleLike(e)}>
                <Icon
                    className={clsx(
                        'w-5 transition-colors duration-200 group-hover:text-redLike',
                        isLiked ? 'text-redLike' : 'text-textGray',
                    )}
                    name={isLiked ? 'heartFill' : 'heart'}
                />
            </TuitButton>
            <span className="text-sm text-textGray group-hover:text-redLike">
                {likes > 0 && likes}
            </span>
        </div>
    );
};

export default LikeButton;
