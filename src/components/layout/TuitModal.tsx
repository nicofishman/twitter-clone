import React, { FC, useCallback, useState } from 'react';

import { api } from '@/utils/api';
import { useUser } from '@/utils/globalState';

import Modal from '../ui/Modal';
import Icon from '../ui/Icon';
import TuitTextarea from '../Tuit/TuitTextarea';
import Avatar from '../ui/Avatar';
import WriteTuitIconsAndButton from '../index/WriteTuitIconsAndButton';

import { tuitModalStore } from './Layout';

interface TuitModalProps {}

const TuitModal: FC<TuitModalProps> = () => {
    const [isOpen] = tuitModalStore.use('isOpen');
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
        if (tuitContent === '') return;
        await createTuitMutation.mutateAsync({
            authorId: user.id,
            body: tuitContent,
        });

        tuitModalStore.set('isOpen', false);
        setTuitContent('');
    }, [createTuitMutation, tuitContent, user.id]);

    return (
        <Modal
            closeModal={() => tuitModalStore.set('isOpen', false)}
            isOpen={isOpen}
            position="top"
        >
            <div className="flex h-full min-h-[314px] flex-col">
                <button onClick={() => tuitModalStore.set('isOpen', false)}>
                    <Icon className="m-4 w-6 text-white" name="cross" />
                </button>
                <div className="flex w-full gap-x-3 px-4">
                    <Avatar user={user} width={48} />
                    <div className="flex w-full flex-col">
                        <div className="mt-9 mb-16 flex w-full flex-col gap-y-4">
                            <TuitTextarea
                                className="min-h-[120px] w-full border-b border-borderGray pb-4"
                                content={tuitContent}
                                doTuit={doTuit}
                                setContent={setTuitContent}
                            />
                        </div>
                        <div className="absolute bottom-2 right-4 left-[70px] mt-4">
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