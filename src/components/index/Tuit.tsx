import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import React, { FC, ReactNode, memo } from 'react';
import { useRouter } from 'next/router';

import Avatar from '@/components/ui/Avatar';
import { RouterOutputs } from '@/utils/api';
import { useUser } from '@/utils/globalState';

import LikeCommentRetweet from '../Tuit/LikeCommentRetweet';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import DropdownThreeDots from '../Tuit/DropdownThreeDots';

type TuitProps = {
    tuit: (
        | Omit<RouterOutputs['tuit']['get'][number], 'replyTo'>
        | Omit<NonNullable<RouterOutputs['tuit']['getById']>, 'replyTo'>
    ) & {
        replyTo: RouterOutputs['tuit']['get'][number]['replyTo'] | null;
    };
    isInView?: boolean;
    isComment?: boolean;
    isFeed?: boolean;
    showReplyTo?: boolean;
    displayComment?: boolean;
};

const Tuit = memo(
    ({
        tuit,
        isInView = false,
        isComment = false,
        isFeed = false,
        showReplyTo = false,
        displayComment = false,
    }: TuitProps) => {
        const user = useUser();
        const router = useRouter();
        const commentsFromSameAuthor =
            'comments' in tuit
                ? tuit.comments.filter((t) => t.authorId === tuit.authorId)
                : [];

        return (
            <>
                {showReplyTo && tuit.replyTo && (
                    <Tuit
                        displayComment
                        isFeed
                        tuit={{
                            ...tuit.replyTo,
                            replyTo: null,
                            replyToId: null,
                        }}
                    />
                )}
                <Link
                    className={isInView ? 'pointer-events-none' : ''}
                    href={`/${tuit.author.username}/status/${tuit.id}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <article
                        className={clsx(
                            'flex w-full cursor-pointer gap-x-3 pl-4 pr-2 pt-3 transition-colors hover:bg-white/[0.03]',
                            {
                                'border-b border-borderGray': !(
                                    (!isComment &&
                                        commentsFromSameAuthor.length > 0) ||
                                    displayComment
                                ),
                            },
                        )}
                    >
                        <div className='relative flex flex-col items-center'>
                            {(isComment || showReplyTo) && (
                                <div className='-mt-4 h-4 w-0.5 bg-textGray' />
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    router.push(`/${tuit.author.username}`);
                                }}
                            >
                                <Avatar user={tuit.author} width={48} />
                            </button>
                            {displayComment && (
                                <div className='mt-0.5 h-full w-0.5 flex-1 rounded-t-full bg-textGray' />
                            )}
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <div className='flex w-full items-center justify-between'>
                                <div className='flex flex-1 gap-x-1 whitespace-nowrap'>
                                    <h3 className='font-bold'>
                                        {tuit.author.full_name}
                                    </h3>
                                    <p className='w-10 flex-1 truncate text-textGray'>
                                        <span>@{tuit.author.username}</span>
                                        <span className='hidden sm:inline'>
                                            {' · '}
                                        </span>
                                        <span className='hidden sm:inline'>
                                            {formatDistanceToNow(
                                                tuit.createdAt,
                                            )}
                                        </span>
                                    </p>
                                </div>
                                <DropdownThreeDots
                                    isSelfUser={tuit.authorId === user.id}
                                    tuit={tuit}
                                />
                            </div>
                            <p className='whitespace-pre'>{tuit.body}</p>
                            <LikeCommentRetweet
                                className='max-w-[300px]'
                                isFeed={isFeed}
                                tuit={tuit}
                                userId={user.id}
                            />
                        </div>
                    </article>
                </Link>
                {displayComment && commentsFromSameAuthor[0] && (
                    <Tuit
                        isComment
                        tuit={{
                            ...commentsFromSameAuthor[0],
                            author: tuit.author,
                            replyTo: tuit,
                        }}
                    />
                )}
            </>
        );
    },
);

Tuit.displayName = 'Tuit';

export default Tuit;

interface TuitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    tooltip?: string;
    hasDropdown?: boolean;
}

export const TuitButton: FC<TuitButtonProps> = ({
    children,
    tooltip,
    hasDropdown,
    ...rest
}) => {
    // set Container to a html div element if hasDropdown is true, else set it to a button
    const Container = hasDropdown ? 'div' : 'button';

    return tooltip ? (
        <Tooltip>
            <TooltipTrigger asChild>
                {/* @ts-ignore */}
                <Container
                    {...rest}
                    className={clsx(
                        'flex w-fit cursor-pointer items-center rounded-full p-2',
                        'xl:items-start',
                        'transition-colors duration-200 hover:bg-lightGray/10',
                    )}
                >
                    {children}
                </Container>
            </TooltipTrigger>
            <TooltipContent side='bottom'>{tooltip}</TooltipContent>
        </Tooltip>
    ) : (
        // @ts-ignore
        <Container
            {...rest}
            className={clsx(
                'flex w-fit cursor-pointer items-center rounded-full p-2',
                'xl:items-start',
                'transition-colors duration-200 hover:bg-lightGray/10',
            )}
        >
            {children}
        </Container>
    );
};

export interface GroupTuitButtonProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    tooltip?: string;
    hasDropdown?: boolean;
}
export const GroupTuitButton = ({
    children,
    tooltip,
    className,
    hasDropdown = false,
    ...rest
}: GroupTuitButtonProps) => {
    return (
        <div className={clsx('group', className)}>
            <TuitButton
                className='group-hover:bg-lightGray/10'
                hasDropdown={hasDropdown}
                tooltip={tooltip}
                {...rest}
            >
                {children}
            </TuitButton>
        </div>
    );
};
