import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import Avatar from '@/components/ui/Avatar';
import { RouterOutputs } from '@/utils/api';
import { useUser } from '@/utils/globalState';

import LikeCommentRetweet from '../Tuit/LikeCommentRetweet';
import ThreeDotsButton from '../Tuit/ThreeDotsButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';

type TuitProps = RouterOutputs['tuit']['get'][number] & {
    isInView?: boolean;
};

const Tuit = ({ isInView = false, ...tuit }: TuitProps) => {
    const user = useUser();

    return (
        <Link
            className={isInView ? 'pointer-events-none' : ''}
            href={`${tuit.author.username}/status/${tuit.id}`}
            onClick={(e) => e.stopPropagation()}
        >
            <article className="flex w-full cursor-pointer gap-x-3 border-b border-borderGray pl-4 pr-2 pt-3 transition-colors hover:bg-white/[0.03]">
                <Avatar user={tuit.author} width={48} />
                <div className="flex flex-1 flex-col">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-1 gap-x-1 truncate">
                            <h3 className="font-bold">
                                {tuit.author.full_name}
                            </h3>
                            <p className="text-textGray">
                                <span>@{tuit.author.username}</span>
                                <span className="hidden sm:inline">
                                    {' · '}
                                </span>
                                <span className="hidden sm:inline">
                                    {formatDistanceToNow(tuit.createdAt)}
                                </span>
                            </p>
                        </div>
                        <ThreeDotsButton />
                    </div>
                    <p className="whitespace-pre">{tuit.body}</p>
                    <LikeCommentRetweet
                        className="max-w-[300px]"
                        tuit={tuit}
                        userId={user.id}
                    />
                </div>
            </article>
        </Link>
    );
};

export default Tuit;

interface TuitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    tooltip?: string;
}

export const TuitButton: FC<TuitButtonProps> = ({
    children,
    tooltip,
    ...rest
}) => {
    return tooltip ? (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    {...rest}
                    className={clsx(
                        'flex w-fit items-center rounded-full p-2',
                        'xl:items-start',
                        'transition-colors duration-200 hover:bg-lightGray/10',
                    )}
                >
                    {children}
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tooltip}</TooltipContent>
        </Tooltip>
    ) : (
        <button
            {...rest}
            className={clsx(
                'flex w-fit items-center rounded-full p-2',
                'xl:items-start',
                'transition-colors duration-200 hover:bg-lightGray/10',
            )}
        >
            {children}
        </button>
    );
};

export interface GroupTuitButtonProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    tooltip?: string;
}
export const GroupTuitButton = ({
    children,
    tooltip,
    className,
    ...rest
}: GroupTuitButtonProps) => {
    return (
        <div className={clsx('group', className)}>
            <TuitButton
                className="group-hover:bg-lightGray/10"
                tooltip={tooltip}
                {...rest}
            >
                {children}
            </TuitButton>
        </div>
    );
};
