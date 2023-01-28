import type { TuitRouter } from './../../server/api/routers/tuit';

import { inferRouterOutputs } from '@trpc/server';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';

import { api } from '../../utils/api';
import { tw } from '../../utils/tw';
import Avatar from '../common/Avatar';
import Icon from '../common/Icon';


type RouterOutput = inferRouterOutputs<TuitRouter>;

type TuitProps = RouterOutput['get'][number] & {
    userId: string;
    isLiked: boolean;
}

const Tuit = ({ body, author, createdAt, id, userId, isLiked, _count }: TuitProps) => {
    const utils = api.useContext();
    const likeMutation = api.tuit.toggleLike.useMutation({
        onSuccess: () => {
            utils.tuit.get.invalidate();
        }
    });

    const doLike = async () => {
        await likeMutation.mutateAsync({ tuitId: id, userId: userId, action: isLiked ? 'dislike' : 'like' });
    };

    return (
        <article className='w-full flex px-4 gap-x-3 pt-3 border-b border-b-borderGray border-x border-x-borderGray'>
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
                    <Icon className='text-textGray' name='threeDots' width={18}/>
                </div>
                <p className='whitespace-pre'>{body}</p>
                <div className='flex w-full max-w-[300px] justify-between'>
                    <TuitButton>
                        <Icon className='group-hover:text-twitterBlue text-textGray duration-200 transition-colors w-5' name='comment' />
                    </TuitButton>
                    <TuitButton>
                        <Icon className='group-hover:text-[rgb(0,186,124)] text-textGray duration-200 transition-colors w-5' name='retweet' />
                    </TuitButton>
                    <div className='flex gap-x-px items-center'>
                        <TuitButton onClick={doLike}>
                            <Icon 
                                className={clsx(
                                    'group-hover:text-[rgb(249,24,128)] duration-200 transition-colors w-5',
                                    isLiked ? 'text-[rgb(249,24,128)]' : 'text-textGray'
                                )} 
                                name={
                                    isLiked ? 'heartFill' : 'heart'
                                }
                            />
                        </TuitButton>
                        <span className='text-textGray text-sm'>{_count.likes > 0 && _count.likes}</span>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default Tuit;

const TuitButton = tw.button`
flex items-center p-2 rounded-full w-fit my-1.5
xl:items-start
hover:bg-lightGray/10
group
`;