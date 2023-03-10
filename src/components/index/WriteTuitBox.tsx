import { FC, useCallback, useState } from 'react';

import Avatar from '@/components/ui/Avatar';
import { api } from '@/utils/api';
import { useUser } from '@/utils/globalState';
import TuitTextarea from '@/components/Tuit/TuitTextarea';

import WriteTuitIconsAndButton from './WriteTuitIconsAndButton';

interface WriteTuitBoxProps {}

const WriteTuitBox: FC<WriteTuitBoxProps> = () => {
    const user = useUser();
    const utils = api.useContext();

    const [tuitContent, setTuitContent] = useState('');

    const createTuitMutation = api.tuit.create.useMutation({
        onSuccess: () => {
            setTuitContent('');
            utils.tuit.get.invalidate();
        },
    });

    const doTuit = useCallback(async () => {
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent,
        });
    }, [createTuitMutation, tuitContent, user.id]);

    return (
        <div className='flex w-full gap-x-3 border-x border-b border-borderGray px-4 pt-1'>
            <Avatar user={user} width={48} />
            <div className='flex flex-1 flex-col'>
                <div className='py-3'>
                    <TuitTextarea
                        content={tuitContent}
                        doTuit={doTuit}
                        setContent={setTuitContent}
                    />
                </div>
                <WriteTuitIconsAndButton
                    doTuit={doTuit}
                    tuitContent={tuitContent}
                />
            </div>
        </div>
    );
};

export default WriteTuitBox;
