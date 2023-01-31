import React, { FC, useMemo } from 'react';
import clsx from 'clsx';

import { RouterOutputs, api } from '@/utils/api';

import { GroupTuitButton } from '../index/Tuit';
import Icon from '../ui/Icon';

import LikeButton from './LikeButton';

interface LikeCommentRetweetProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string;
    tuit: RouterOutputs['tuit']['get'][number];
    singleTuit?: boolean
}

const LikeCommentRetweet: FC<LikeCommentRetweetProps> = ({ className, tuit, userId, singleTuit = false }) => {
    const isLiked = useMemo(() => (tuit.likes.some(like => like.authorId === userId)), [tuit.likes, userId]);
    const cli = api.useContext();
    const toggleLikeMutation = api.tuit.toggleLike.useMutation({
        onMutate: async ({ tuitId, userId, action }) => {
            let prevTuit: RouterOutputs['tuit']['getById'] | undefined;
            let prevTuits: RouterOutputs['tuit']['get'] | undefined;

            if (singleTuit) {
                await cli.tuit.getById.cancel({ id: tuitId });            
                prevTuit = cli.tuit.getById.getData({ id: tuitId });
            } else {
                await cli.tuit.get.cancel();
                prevTuits = cli.tuit.get.getData();
                prevTuit = prevTuits?.find(t => t.id === tuitId);
            }
            
            if (!prevTuit || (!singleTuit && !prevTuits)) {
                return;
            }

            const newTuit = {
                ...prevTuit,
                likes: action === 'like' ? [...prevTuit.likes, {
                    authorId: userId,
                    createdAt: new Date(),
                    id: 'temp',
                    tuitId,
                    updatedAt: new Date()
                }] : prevTuit.likes.filter(like => like.authorId !== userId),
                _count: {
                    ...prevTuit._count,
                    likes: action === 'like' ? prevTuit._count.likes + 1 : prevTuit._count.likes - 1
                }
            };

            if (singleTuit) {
                cli.tuit.getById.setData({ id: tuitId }, newTuit);
                
                return { prevTuit };
            } else {
                if (!prevTuits) {
                    return;
                }
                cli.tuit.get.setData(undefined, 
                    [...prevTuits.filter(t => t.id !== tuitId), newTuit]
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                );

                return { prevTuits };

            }
        },
        onSettled: () => {
            cli.tuit.get.invalidate();
            cli.tuit.getById.invalidate({ id: tuit.id });
        }
    });

    const handleLike = async () => {
        toggleLikeMutation.mutate({ tuitId: tuit.id, userId, action: isLiked ? 'dislike' : 'like' });
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
