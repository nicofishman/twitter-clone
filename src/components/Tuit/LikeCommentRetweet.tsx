import React, { FC, useMemo } from 'react';
import clsx from 'clsx';

import { RouterOutputs, api } from '@/utils/api';

import { GroupTuitButton } from '../index/Tuit';
import Icon from '../ui/Icon';

import LikeButton from './LikeButton';

interface LikeCommentRetweetProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string;
    tuit: RouterOutputs['tuit']['get'][number];
}

const LikeCommentRetweet: FC<LikeCommentRetweetProps> = ({ className, tuit, userId }) => {
    const isLiked = useMemo(() => (tuit.likes.some(like => like.authorId === userId)), [tuit.likes, userId]);
    const cli = api.useContext();
    const toggleLike = api.tuit.toggleLike.useMutation({
        onSuccess: () => {
            cli.tuit.get.invalidate();
            cli.tuit.getById.invalidate({ id: tuit.id });
        }
    });

    const handleLike = async () => {
        await toggleLike.mutateAsync({ tuitId: tuit.id, userId, action: isLiked ? 'dislike' : 'like' });
    };

    return (
        <div className={clsx(className, 'flex w-full justify-between my-1.5')}>
            <div className='flex gap-x-px items-center'>
                <GroupTuitButton tooltip='reply'>
                    <Icon className='group-hover:text-twitterBlue text-textGray duration-200 transition-colors w-5' name='comment' />
                    {/* //TODO: Add comment count */}
                </GroupTuitButton>
            </div>
            <div className='flex gap-x-px items-center'>
                <GroupTuitButton tooltip='retweet'>
                    <Icon className='group-hover:text-greenRetweet text-textGray duration-200 transition-colors w-5' name='retweet' />
                    {/* //TODO: Add retweet count */}
                </GroupTuitButton>
            </div>
            <LikeButton doLike={handleLike} isLiked={isLiked} likes={tuit._count.likes} />
        </div>
    );
};

export default LikeCommentRetweet;
