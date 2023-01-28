import React, { FC } from 'react';

import { TuitButton } from '../index/Tuit';
import Icon from '../common/Icon';

interface ThreeDotsButtonProps {
    className?: string;
}

const ThreeDotsButton: FC<ThreeDotsButtonProps> = ({ className }) => {
    return (
        <div className='group'>
            <TuitButton className={className}>
                <Icon className='w-5 text-textGray group-hover:text-twitterBlue' name='threeDots' />
            </TuitButton>
        </div>
    );
};

export default ThreeDotsButton;
