import React, { FC } from 'react';

import { GroupTuitButton } from '@/components/index/Tuit';
import Icon from '@/components/ui/Icon';

interface ThreeDotsButtonProps {
    className?: string;
    hasDropdown?: boolean;
}

const ThreeDotsButton: FC<ThreeDotsButtonProps> = ({
    className,
    hasDropdown = false,
}) => {
    return (
        <GroupTuitButton className={className} hasDropdown={hasDropdown}>
            <Icon
                className='w-5 text-textGray group-hover:text-twitterBlue'
                name='threeDots'
            />
        </GroupTuitButton>
    );
};

export default ThreeDotsButton;
