
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { ReactNode } from 'react';

import Avatar from '@/components/common/Avatar';
import Icon from '@/components/common/Icon';
import { RouterOutputs, api } from '@/utils/api';
import { useUser } from '@/utils/globalState';
import { tw } from '@/utils/tw';

import LikeButton from '../Tuit/LikeButton';
import ThreeDotsButton from '../Tuit/ThreeDotsButton';

type TuitProps = RouterOutputs['tuit']['get'][number] & {
    isInView?: boolean;
}

const Tuit = ({ body, author, createdAt, id, likes, _count, isInView = false }: TuitProps) => {
    const user = useUser();
    const isLiked = likes.find((like) => like.authorId === user.id);
    const utils = api.useContext();
    const likeMutation = api.tuit.toggleLike.useMutation({
        onSuccess: () => {
            utils.tuit.get.invalidate();
        }
    });

    const doLike = async () => {
        await likeMutation.mutateAsync({ tuitId: id, userId: user.id, action: isLiked ? 'dislike' : 'like' });
    };

    return (
        <Link className={isInView ? 'pointer-events-none' : ''} href={`${author.username}/status/${id}`} onClick={e => e.stopPropagation()}>
            <article className='w-full flex pl-4 pr-2 gap-x-3 pt-3 border-b border-borderGray cursor-pointer hover:bg-white/[0.03] transition-colors'>
                <Avatar alt={`${author.username}'s profile picture`} src={author.image} width={48} />
                <div className='flex-1 flex flex-col'>
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex-1 truncate flex gap-x-1'>
                            <h3 className='font-bold'>{author.full_name}</h3>
                            <p className='text-textGray'>
                                <span>@{author.username}</span>
                                <span className='sm:inline hidden'>{' · '}</span>
                                <span className='sm:inline hidden'>{formatDistanceToNow(createdAt)}</span>
                            </p>
                        </div>
                        <ThreeDotsButton />
                    </div>
                    <p className='whitespace-pre'>{body}</p>
                    <div className='flex w-full max-w-[300px] justify-between my-1.5'>
                        <div className='flex gap-x-px items-center'>
                            <GroupTuitButton>
                                <Icon className='group-hover:text-twitterBlue text-textGray duration-200 transition-colors w-5' name='comment' />
                                {/* //TODO: Add comment count */}
                            </GroupTuitButton>
                        </div>
                        <div className='flex gap-x-px items-center'>
                            <GroupTuitButton>
                                <Icon className='group-hover:text-greenRetweet text-textGray duration-200 transition-colors w-5' name='retweet' />
                                {/* //TODO: Add retweet count */}
                            </GroupTuitButton>
                        </div>
                        <LikeButton doLike={doLike} isLiked={!!isLiked} likes={_count.likes} />

                    </div>
                </div>
            </article>
        </Link>

    );
};

export default Tuit;

export const TuitButton = tw.button`
flex items-center p-2 rounded-full w-fit
xl:items-start
hover:bg-lightGray/10
transition-colors duration-200
`;

export const GroupTuitButton = ({ children }: {children: ReactNode}) => {
    return (
        <div className="group">
            <TuitButton className='group-hover:bg-lightGray/10'>
                {children}    
            </TuitButton>
        </div>
    );
};