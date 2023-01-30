import { FC, useCallback, useState } from 'react';


import Avatar from '@/components/ui/Avatar';
import { api } from '@/utils/api';
import { useUser } from '@/utils/globalState';

import TuitTextarea from '../Tuit/TuitTextarea';

import WriteTuitIconsAndButton from './WriteTuitIconsAndButton';

interface WriteTuitBoxProps {

}

const WriteTuitBox: FC<WriteTuitBoxProps> = () => {
    const user = useUser();
    const utils = api.useContext();

    const [tuitContent, setTuitContent] = useState('');

    const createTuitMutation = api.tuit.create.useMutation({
        onSuccess: () => {
            setTuitContent('');
            utils.tuit.get.invalidate();
        }
    });

    const doTuit = useCallback(async () => {
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent
        });
    }, [createTuitMutation, tuitContent, user.id]);

    return (
        <div className='w-full px-4 pt-1 flex gap-x-3 border-b border-x border-borderGray'>
            <Avatar user={user} width={48}/>
            <div className='flex-1 flex flex-col'>
                <div className='py-3'>
                    <TuitTextarea content={tuitContent} doTuit={doTuit} setContent={setTuitContent} />
                </div>
                <WriteTuitIconsAndButton doTuit={doTuit} tuitContent={tuitContent} />
            </div>
        </div>
    );
};

export default WriteTuitBox;
