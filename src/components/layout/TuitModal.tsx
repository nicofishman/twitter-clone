import React, { FC, useCallback, useState } from 'react';

import { api } from '@/utils/api';
import { useUser } from '@/utils/globalState';

import Modal from '../ui/Modal';
import Icon from '../ui/Icon';
import TuitTextarea from '../Tuit/TuitTextarea';
import Avatar from '../ui/Avatar';
import WriteTuitIconsAndButton from '../index/WriteTuitIconsAndButton';

import { tuitModalStore } from './Layout';

interface TuitModalProps {

}

const TuitModal: FC<TuitModalProps> = () => {
    const [isOpen] = tuitModalStore.use('isOpen');
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
        if (tuitContent === '') return;
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent
        });

        tuitModalStore.set('isOpen', false);
        setTuitContent('');
    }, [createTuitMutation, tuitContent, user.id]);

    return (
        <Modal closeModal={() => tuitModalStore.set('isOpen', false)} isOpen={isOpen} position='top'>
            <div className='flex flex-col min-h-[314px] h-full'>
                <button onClick={() => tuitModalStore.set('isOpen', false)}>
                    <Icon className='w-6 m-4 text-white' name='cross'/>
                </button>
                <div className="flex w-full px-4 gap-x-3">
                    <Avatar user={user} width={48} />
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col mt-9 w-full gap-y-4 mb-16">
                            <TuitTextarea className='w-full min-h-[120px] border-b border-borderGray pb-4' content={tuitContent} doTuit={doTuit} setContent={setTuitContent} />
                        </div>
                        <div className="absolute bottom-2 right-4 left-[70px] mt-4">
                            <WriteTuitIconsAndButton doTuit={doTuit} tuitContent={tuitContent} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TuitModal;
