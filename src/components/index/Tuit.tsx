import { Prisma } from '@prisma/client';
import React, { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Avatar from '../common/Avatar';
import Icon from '../common/Icon';
import { tw } from '../../utils/tw';

interface TuitProps extends Prisma.TuitGetPayload<{
    include: {
        author: true;
        likes: true;
    }
}> {

}

const Tuit: FC<TuitProps> = ({ body, author, createdAt }) => {
    return (
        <article className='w-full flex px-4 gap-x-3 pt-3 border-b border-b-borderGray'>
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
                <p>{body}</p>
                <div className='flex w-full max-w-[300px] justify-between [&>button>svg]:duration-200 [&>button>svg]:transition-colors [&>button>svg]:text-textGray [&>button>svg]:w-5'>
                    <TuitButton>
                        <Icon className='group-hover:text-twitterBlue' name='comment' />
                    </TuitButton>
                    <TuitButton>
                        <Icon className='group-hover:text-[rgb(0,186,124)]' name='retweet' />
                    </TuitButton>
                    <TuitButton>
                        <Icon className='group-hover:text-[rgb(249,24,128)]' name='heart' />
                    </TuitButton>
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