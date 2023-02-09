import React from 'react';

import { RouterOutputs } from '@/utils/api';

import Loader from '../ui/Loader';
import Tuit from '../index/Tuit';

interface CommentsListProps {
    comments: RouterOutputs['tuit']['getComments'] | undefined;
}

const CommentsList = ({ comments }: CommentsListProps) => {
    if (!comments) {
        return (
            <div className='my-5 flex w-full justify-center'>
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {comments?.comments.map((comment) => (
                <Tuit key={comment.id} isComment tuit={comment} />
            ))}
        </div>
    );
};

export default CommentsList;
