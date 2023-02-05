import React, { useState } from 'react';
import clsx from 'clsx';

import { useUser } from '@/utils/globalState';
import useAutosizeTextArea from '@/hooks/useAutosizeTextarea';
import { api } from '@/utils/api';

import Avatar from '../ui/Avatar';
import DoTuitButton from '../Tuit/DoTuitButton';
import Icon from '../ui/Icon';
import { TuitButton } from '../index/Tuit';
import TuitTextarea from '../Tuit/TuitTextarea';

interface ReplyBoxProps {
    tuitId: string;
}

const ReplyBox = ({ tuitId }: ReplyBoxProps) => {
    const user = useUser();
    const utils = api.useContext();
    const makeCommentMutation = api.tuit.makeComment.useMutation({
        onSuccess: () => {
            utils.tuit.getById.invalidate({
                id: tuitId,
            });
            utils.tuit.getComments.invalidate({
                tuitId: tuitId,
            });
        },
    });

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const [replyContent, setReplyContent] = useState('');
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);

    useAutosizeTextArea(textAreaRef.current, replyContent);

    const handleReply = () => {
        if (!replyContent || replyContent === '') return;
        console.log('Replying...');
        makeCommentMutation.mutate({
            replyId: tuitId,
            body: replyContent,
            authorId: user.id,
        });
        setReplyContent('');
    };

    return (
        <div className="flex min-h-[84px] w-full border-b border-borderGray px-4 pt-3">
            <div className="h-full">
                <Avatar user={user} width={48} />
            </div>
            <div className="ml-3 grow">
                <div
                    className={clsx('flex h-full', {
                        'mb-3 flex-col': isTextareaFocused,
                    })}
                >
                    <TuitTextarea
                        className="min-h-[52px] pt-3"
                        content={replyContent}
                        doTuit={handleReply}
                        placeholder="Tweet your reply"
                        setContent={setReplyContent}
                        onBlur={() => setIsTextareaFocused(false)}
                        onFocus={() => setIsTextareaFocused(true)}
                    />
                    <div className="flex items-center justify-between">
                        <div
                            className={clsx('flex gap-x-2', {
                                'mt-3 hidden w-full': !isTextareaFocused,
                                'w-fit': isTextareaFocused,
                            })}
                        >
                            <TuitButton tooltip="Media">
                                <Icon
                                    className="w-5 text-twitterBlue"
                                    name="gallery"
                                />
                            </TuitButton>
                            <TuitButton tooltip="GIF">
                                <Icon
                                    className="w-5 text-twitterBlue"
                                    name="gif"
                                />
                            </TuitButton>
                            <TuitButton tooltip="Emoji">
                                <Icon
                                    className="w-5 text-twitterBlue"
                                    name="emoji"
                                />
                            </TuitButton>
                            <TuitButton tooltip="Tag Location">
                                <Icon
                                    className="w-5 text-twitterBlue"
                                    name="location"
                                />
                            </TuitButton>
                        </div>
                        <DoTuitButton
                            className="py-[7px] px-4"
                            doTuit={handleReply}
                            tuitContent={replyContent}
                        >
                            Reply
                        </DoTuitButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyBox;
