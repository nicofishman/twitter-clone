
import { RouterOutputs } from '@/utils/api';

import Avatar from '../common/Avatar';
import ThreeDotsButton from '../Tuit/ThreeDotsButton';

import TuitDateTime from './TuitDateTime';

type TuitInPageProps = RouterOutputs['tuit']['getById'] & {

};

const TuitInPage = ({ author, ...tuit }: TuitInPageProps) => {
    return (
        <article className='w-full px-4 pt-3 flex flex-col'>
            <div className='border-b border-borderGray'>

                <header className='w-full flex justify-between'>
                    <div className='flex gap-x-3'>
                        <Avatar alt={`${author.full_name}'s profile picture`} src={author.image} width={48}/>
                        <div className='flex-col'>
                            <h1 className='text-base font-bold'>{author.full_name}</h1>
                            <h2 className='text-base text-gray-500'>@{author.username}</h2>
                        </div>
                    </div>
                    <ThreeDotsButton />
                </header>
                <div className='w-full mt-3'>
                    <p className='text-2xl font-normal'>{tuit.body}</p>
                </div>
                <div className="w-full my-4">
                    <TuitDateTime date={tuit.createdAt} />
                </div>
            </div>

        </article>
    );
};

export default TuitInPage;
