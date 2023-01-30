import clsx from 'clsx';
import { FC, useCallback, useEffect, useRef, useState } from 'react';


import Avatar from '@/components/ui/Avatar';
import useAutosizeTextArea from '@/hooks/useAutosizeTextarea';
import { useUser } from '@/utils/globalState';
import { api } from '@/utils/api';

import WriteTuitIconsAndButton from './WriteTuitIconsAndButton';

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
            utils.tuit.get.invalidate();
        }
    });

    const doTuit = useCallback(async () => {
        console.log('doTuit', tuitContent, user.id);
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent
        });
    }, [createTuitMutation, tuitContent, user.id]);

    useAutosizeTextArea(textAreaRef.current, tuitContent);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            doTuit();
        }
    }, [doTuit]);

    useEffect(() => {
        const curr = textAreaRef.current;

        if (curr) {
            textAreaRef.current.addEventListener('keydown', onKeyDown);
        }

        return () => {
            if (curr) {
                curr.removeEventListener('keydown', onKeyDown);
            }
        };

    }, [onKeyDown]);

    return (
        <div className='w-full px-4 pt-1 flex gap-x-3 border-b border-x border-borderGray'>
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
                <WriteTuitIconsAndButton doTuit={doTuit} tuitContent={tuitContent} />
            </div>
        </div>
    );
};

export default WriteTuitBox;
