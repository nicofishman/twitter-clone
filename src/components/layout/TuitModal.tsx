import React, { FC, useCallback, useState } from 'react';

import { api } from '@/utils/api';
import { useUser } from '@/utils/globalState';
import Modal from '@/components/ui/Modal';
import Icon from '@/components/ui/Icon';
import TuitTextarea from '@/components/Tuit/TuitTextarea';
import Avatar from '@/components/ui/Avatar';
import WriteTuitIconsAndButton from '@/components/index/WriteTuitIconsAndButton';

import { modalsStore } from './Layout';

interface TuitModalProps {}

const TuitModal: FC<TuitModalProps> = () => {
    const [isOpen] = modalsStore.use('writeTuit');
    const user = useUser();
    const utils = api.useContext();
    const [tuitContent, setTuitContent] = useState('');

    const createTuitMutation = api.tuit.create.useMutation({
        onSuccess: () => {
            setTuitContent('');
            utils.tuit.getFeedByUsername.invalidate();
            utils.tuit.get.invalidate();
        },
    });

    const doTuit = useCallback(async () => {
        if (tuitContent === '') return;
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent,
        });

        modalsStore.set('writeTuit', false);
        setTuitContent('');
    }, [createTuitMutation, tuitContent, user.id]);

    return (
        <Modal
            closeModal={() => modalsStore.set('writeTuit', false)}
            isOpen={isOpen}
            position='top'
        >
            <div className='flex h-full min-h-[314px] flex-col'>
                <button
                    className='w-fit'
                    onClick={() => modalsStore.set('writeTuit', false)}
                >
                    <Icon className='w-6 p-4 text-white' name='cross' />
                </button>
                <div className='flex w-full gap-x-3 px-4'>
                    <Avatar user={user} width={48} />
                    <div className='flex w-full flex-col'>
                        <div className='mt-9 mb-16 flex w-full flex-col gap-y-4'>
                            <TuitTextarea
                                className='min-h-[120px] w-full border-b border-borderGray pb-4'
                                content={tuitContent}
                                doTuit={doTuit}
                                setContent={setTuitContent}
                            />
                        </div>
                        <div className='absolute bottom-2 right-4 left-[70px] mt-4'>
                            <WriteTuitIconsAndButton
                                doTuit={doTuit}
                                tuitContent={tuitContent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TuitModal;
