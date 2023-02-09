import { RouterOutputs } from '@/utils/api';
import { useUser } from '@/utils/globalState';
import { TuitWithRecursiveComments } from '@/types/TuitTypes';

import LikeCommentRetweet from '../Tuit/LikeCommentRetweet';
import Avatar from '../ui/Avatar';

import TuitDateTime from './TuitDateTime';
import DropdownThreeDots from './../Tuit/DropdownThreeDots';
import ReplyBox from './ReplyBox';

type TuitInPageProps = RouterOutputs['tuit']['getById'] & {};

const TuitInPage = ({ author, ...tuit }: TuitInPageProps) => {
    const wholeTuit = {
        author,
        ...tuit,
    } as TuitWithRecursiveComments;

    const user = useUser();

    return (
        <>
            <article className='flex w-full flex-col px-4 pt-3'>
                <div className='border-b border-borderGray'>
                    <header className='flex w-full justify-between'>
                        <div className='flex gap-x-3'>
                            <Avatar user={author} width={48} />
                            <div className='flex-col'>
                                <h1 className='text-base font-bold'>
                                    {author.full_name}
                                </h1>
                                <h2 className='text-base text-gray-500'>
                                    @{author.username}
                                </h2>
                            </div>
                        </div>
                        <DropdownThreeDots
                            isSelfUser={tuit.authorId === user.id}
                            tuit={wholeTuit}
                        />
                    </header>
                    <div className='mt-3 w-full'>
                        <p className='text-2xl font-normal'>{tuit.body}</p>
                    </div>
                    <div className='my-4 w-full'>
                        <TuitDateTime date={tuit.createdAt} />
                    </div>
                </div>
                <div className='border-b border-borderGray'>
                    <LikeCommentRetweet
                        isSingleTuit
                        className='max-w-[400px]'
                        tuit={wholeTuit}
                        userId={user.id}
                    />
                </div>
            </article>
            <ReplyBox tuitId={tuit.id} />
        </>
    );
};

export default TuitInPage;
