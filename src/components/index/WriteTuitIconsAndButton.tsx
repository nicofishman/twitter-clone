import React, { FC } from 'react';
import clsx from 'clsx';

import Icon from '@/components/common/Icon';
import { GroupTuitButton } from '@/components/index/Tuit';

interface WriteTuitIconsAndButtonProps {
    tuitContent: string;
    doTuit: () => void;
}

const WriteTuitIconsAndButton: FC<WriteTuitIconsAndButtonProps> = ({ doTuit, tuitContent }) => {
    return (
        <div className='w-full flex justify-between items-center'>
            <div className='flex gap-x-1 mb-2 [&>div]:!p-0 items-center'>
                {/* icons */}
                <GroupTuitButton tooltip="media">
                    <Icon className='text-twitterBlue group-hover:text-twitterBlueHover transition-colors duration-200' height={20} name='gallery' width={20} />
                </GroupTuitButton>
                <GroupTuitButton tooltip='GIF'>
                    <Icon className='text-twitterBlue group-hover:text-twitterBlueHover transition-colors duration-200' height={20} name='gif' width={20} />
                </GroupTuitButton>
                <GroupTuitButton tooltip='poll'>
                    <Icon className='text-twitterBlue group-hover:text-twitterBlueHover transition-colors duration-200' height={20} name='poll' width={20} />
                </GroupTuitButton>
                <GroupTuitButton tooltip='emoji'>
                    <Icon className='text-twitterBlue group-hover:text-twitterBlueHover transition-colors duration-200' height={20} name='emoji' width={20} />
                </GroupTuitButton>
                <GroupTuitButton tooltip='schedule'>
                    <Icon className='text-twitterBlue group-hover:text-twitterBlueHover transition-colors duration-200' height={20} name='schedule' width={20} />
                </GroupTuitButton>
                <GroupTuitButton tooltip='tag location'>
                    <Icon className='text-twitterBlue group-hover:text-twitterBlueHover transition-colors duration-200' height={20} name='location' width={20} />
                </GroupTuitButton>
            </div>
            <div>
                <button 
                    className={clsx(
                        'rounded-full px-3 py-1 bg-twitterBlue hover:bg-twitterBlueHover transition-all duration-200',
                        'disabled:opacity-60 disabled:hover:bg-twitterBlue'
                    )} 
                    disabled={tuitContent.length === 0}
                    onClick={doTuit}
                >
                    <span className='text-white mx-3 text-base font-bold'>Tweet</span>
                </button>
            </div>
        </div>
    );
};

export default WriteTuitIconsAndButton;
