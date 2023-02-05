import clsx from 'clsx';
import React, { FC, useMemo } from 'react';

import { RouterOutputs, api } from '@/utils/api';
import { TuitButton } from '@/components/index/Tuit';

import { GroupTuitButton } from '../index/Tuit';
import Icon from '../ui/Icon';
import { modalsStore } from '../layout/Layout';

import LikeButton from './LikeButton';

interface LikeCommentRetweetProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string;
    tuit: RouterOutputs['tuit']['get'][number];
    isSingleTuit?: boolean;
    isFeed?: boolean;
    isComment?: boolean;
}

const LikeCommentRetweet: FC<LikeCommentRetweetProps> = ({
    className,
    tuit,
    userId,
    isFeed = false,
    isSingleTuit = false,
}) => {
    const isLiked = useMemo(
        () => tuit.likes.some((like) => like.authorId === userId),
        [tuit.likes, userId],
    );
    const cli = api.useContext();
    const toggleLikeMutation = api.tuit.toggleLike.useMutation({
        onMutate: async ({ tuitId, userId, action }) => {
            let prevTuit: RouterOutputs['tuit']['getById'] | undefined;
            let prevTuits: RouterOutputs['tuit']['get'] | undefined;

            if (isSingleTuit) {
                await cli.tuit.getById.cancel({ id: tuitId });
                prevTuit = cli.tuit.getById.getData({ id: tuitId });
            } else {
                await cli.tuit.get.cancel();
                prevTuits = cli.tuit.get.getData();
                prevTuit = prevTuits?.find((t) => t.id === tuitId);
            }

            if (!prevTuit || (isSingleTuit && !prevTuits)) {
                return;
            }

            const newTuit = {
                ...prevTuit,
                likes:
                    action === 'like'
                        ? [
                              ...prevTuit.likes,
                              {
                                  authorId: userId,
                                  createdAt: new Date(),
                                  id: 'temp',
                                  tuitId,
                                  updatedAt: new Date(),
                              },
                          ]
                        : prevTuit.likes.filter(
                              (like) => like.authorId !== userId,
                          ),
                _count: {
                    ...prevTuit._count,
                    likes:
                        action === 'like'
                            ? prevTuit._count.likes + 1
                            : prevTuit._count.likes - 1,
                },
            };

            if (isSingleTuit) {
                cli.tuit.getById.setData({ id: tuitId }, newTuit);

                return { prevTuit };
            } else {
                if (!prevTuits) {
                    return;
                }
                cli.tuit.get.setData(
                    undefined,
                    [...prevTuits.filter((t) => t.id !== tuitId), newTuit].sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                    ),
                );

                return { prevTuits };
            }
        },
        onSettled: () => {
            cli.tuit.get.invalidate();
            cli.tuit.getById.invalidate({ id: tuit.id });
            cli.tuit.getComments.invalidate({ tuitId: tuit.replyToId ?? '' });
        },
    });

    const handleLike = async () => {
        toggleLikeMutation.mutate({
            tuitId: tuit.id,
            userId,
            action: isLiked ? 'dislike' : 'like',
        });
    };

    const handleOpenReplyModal = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        if (!isFeed) return;
        e.preventDefault();
        e.stopPropagation();
        modalsStore.set('reply', tuit);
    };

    return (
        <div className={clsx(className, 'my-1.5 flex w-full justify-between')}>
            <div className="group flex items-center gap-x-px">
                <TuitButton
                    tooltip="reply"
                    onClick={(e) => handleOpenReplyModal(e)}
                >
                    <Icon
                        className="w-5 text-textGray transition-colors duration-200 group-hover:text-twitterBlue"
                        name="comment"
                    />
                </TuitButton>
                <span className="text-sm text-textGray group-hover:text-twitterBlue">
                    {tuit._count.comments > 0 && tuit._count.comments}
                </span>
            </div>
            <div className="flex items-center gap-x-px">
                <GroupTuitButton tooltip="retweet">
                    <Icon
                        className="w-5 text-textGray transition-colors duration-200 group-hover:text-greenRetweet"
                        name="retweet"
                    />
                </GroupTuitButton>
            </div>
            <LikeButton
                doLike={handleLike}
                isLiked={isLiked}
                likes={tuit._count.likes}
            />
        </div>
    );
};

export default LikeCommentRetweet;
