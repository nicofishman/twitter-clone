import type { TuitRouter } from '@/server/api/routers/tuit';

import { inferRouterOutputs } from '@trpc/server';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

import Avatar from '@/components/common/Avatar';
import Icon from '@/components/common/Icon';
import { api } from '@/utils/api';
import { tw } from '@/utils/tw';
import { useUser } from '@/utils/globalState';


type RouterOutput = inferRouterOutputs<TuitRouter>;

type TuitProps = RouterOutput['get'][number] & {
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
        <Link className={isInView ? 'pointer-events-none' : ''} href={`${author.username}/status/${id}`}>
            <article className='w-full flex pl-4 pr-2 gap-x-3 pt-3 border-b border-borderGray cursor-pointer hover:bg-white/[0.03] transition-colors pointer-events-auto'>
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
                        <TuitButton className='!my-0'>
                            <Icon className='text-textGray group-hover:text-twitterBlue duration-200 transition-colors' name='threeDots' width={18}/>
                        </TuitButton>
                    </div>
                    <p className='whitespace-pre'>{body}</p>
                    <div className='flex w-full max-w-[300px] justify-between'>
                        <div className='flex gap-x-px items-center group'>
                            <TuitButton>
                                <Icon className='group-hover:text-twitterBlue text-textGray duration-200 transition-colors w-5' name='comment' />
                                {/* //TODO: Add comment count */}
                            </TuitButton>
                        </div>
                        <div className='flex gap-x-px items-center group'>
                            <TuitButton>
                                <Icon className='group-hover:text-greenRetweet text-textGray duration-200 transition-colors w-5' name='retweet' />
                                {/* //TODO: Add retweet count */}
                            </TuitButton>
                        </div>
                        <div className='flex gap-x-px items-center group'>
                            <TuitButton onClick={doLike}>
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
                            <span className='text-textGray text-sm group-hover:text-redLike'>{_count.likes > 0 && _count.likes}</span>
                        </div>

                    </div>
                </div>
            </article>
        </Link>

    );
};

export default Tuit;

const TuitButton = tw.button`
flex items-center p-2 rounded-full w-fit my-1.5
xl:items-start
group-hover:bg-lightGray/10
transition-colors duration-200

`;