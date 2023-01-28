import React, { FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useUser } from '../../utils/globalState';
import Avatar from '../common/Avatar';
import useAutosizeTextArea from '../../hooks/useAutosizeTextarea';
import Icon from '../common/Icon';
import { api } from '../../utils/api';

interface WriteTuitBoxProps {

}

const WriteTuitBox: FC<WriteTuitBoxProps> = () => {
    const user = useUser();
    const utils = api.useContext();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [tuitContent, setTuitContent] = useState('');
    const createTuitMutation = api.tuit.create.useMutation({
        onSuccess: () => {
            setTuitContent('');
            utils.tuit.getAll.invalidate();
        }
    });

    useAutosizeTextArea(textAreaRef.current, tuitContent);



    const doTuit = async () => {
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent
        });
    };

    return (
        <div className='w-full px-4 pt-1 flex gap-x-3 border-b border-b-borderGray'>
            <Avatar alt={`${user.username}'s profile picture`} src={user.image} width={48}/>
            <div className='flex-1 flex flex-col'>
                <div className='py-3'>
                    <textarea 
                        ref={textAreaRef} 
                        className={clsx('focus:outline-none w-full resize-none text-xl text-white placeholder:text-textGray overflow-y-hidden break-words bg-transparent min-h-[30px]')} 
                        placeholder="What's happening?"
                        value={tuitContent}
                        onChange={e => setTuitContent(e.target.value)}
                    />
                </div>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex gap-x-4 py-4 [&>div]:!p-0'>
                        {/* icons */}
                        <Icon className='text-twitterBlue' height={20} name='gallery' width={20} />
                        <Icon className='text-twitterBlue' height={20} name='gif' width={20} />
                        <Icon className='text-twitterBlue' height={20} name='poll' width={20} />
                        <Icon className='text-twitterBlue' height={20} name='emoji' width={20} />
                        <Icon className='text-twitterBlue' height={20} name='schedule' width={20} />
                        <Icon className='text-twitterBlue' height={20} name='location' width={20} />
                    </div>
                    <div>
                        <button 
                            className={clsx(
                                'rounded-full px-3 py-1 bg-twitterBlue hover:bg-twitterBlueHover transition-all duration-200',
                                'disabled:opacity-60 disabled:hover:bg-twitterBlue'
                            )} 
                            disabled={tuitContent.length === 0}
                            onClick={doTuit}
                        >
                            <span className='text-white mx-3 text-base font-bold'>Tweet</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteTuitBox;
