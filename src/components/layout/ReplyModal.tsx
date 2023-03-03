import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { useUser } from '@/utils/globalState';
import { api } from '@/utils/api';
import Modal from '@/components/ui/Modal';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';
import TuitTextarea from '@/components/Tuit/TuitTextarea';

import { modalsStore } from './Layout';
import WriteTuitIconsAndButton from './../index/WriteTuitIconsAndButton';

interface ReplyModalProps {}

const ReplyModal = ({}: ReplyModalProps) => {
    const [replyContent, setReplyContent] = useState('');
    const utils = api.useContext();
    const [tuit] = modalsStore.use('reply');
    const user = useUser();

    const makeCommentMutation = api.tuit.makeComment.useMutation({
        onSuccess: () => {
            utils.tuit.get.invalidate();
            utils.tuit.getWithRepliesByUsername.invalidate();
        },
    });

    const doTuit = () => {
        makeCommentMutation.mutate({
            replyId: tuit?.id ?? '',
            body: replyContent,
            authorId: user.id,
        });
        setReplyContent('');
        modalsStore.set('reply', null);
    };

    if (!tuit) return null;

    return (
        <Modal
            closeModal={() => modalsStore.set('reply', null)}
            isOpen={tuit !== null}
            position='top'
        >
            <div className='flex h-full min-h-[346px] flex-col'>
                <button
                    className='w-fit'
                    onClick={() => modalsStore.set('reply', null)}
                >
                    <Icon className='m-4 w-6 text-white' name='cross' />
                </button>
                <div className='flex gap-x-3 px-4 pt-3'>
                    <div className='flex flex-col items-center'>
                        <Avatar user={tuit.author} width={48} />
                        <div className='mt-0.5 h-10 w-0.5 rounded-t-full bg-textGray/50' />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <p className='text-sm'>
                                <span className='font-bold text-white'>
                                    {tuit.author.username}
                                </span>
                                <span className='ml-1 text-textGray'>
                                    @{tuit.author.username} {' · '}
                                </span>
                                <span className='text-textGray'>
                                    {formatDistanceToNow(tuit.createdAt)}
                                </span>
                            </p>
                        </div>
                        <p>{tuit.body}</p>
                        <div className='mt-4 flex gap-x-1'>
                            <span className='text-textGray'>Replying to </span>
                            <a className='text-twitterBlue'>
                                @{tuit.author.username}
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-3 px-4'>
                    <Avatar user={user} width={48} />
                    <div className='flex flex-1 flex-col'>
                        <TuitTextarea
                            className='min-h-[150px] w-full py-3'
                            content={replyContent}
                            doTuit={doTuit}
                            placeholder='Tweet your reply'
                            setContent={setReplyContent}
                        />
                        <WriteTuitIconsAndButton
                            doTuit={doTuit}
                            tuitContent={replyContent}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ReplyModal;
