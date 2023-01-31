import React, { FC } from 'react';
import clsx from 'clsx';

import Icon from '@/components/ui/Icon';
import { GroupTuitButton } from '@/components/index/Tuit';

interface WriteTuitIconsAndButtonProps {
    tuitContent: string;
    doTuit: () => void;
}

const WriteTuitIconsAndButton: FC<WriteTuitIconsAndButtonProps> = ({
    doTuit,
    tuitContent,
}) => {
    return (
        <div className="mb-2 flex w-full items-center justify-between">
            <div className="flex items-center gap-x-1 [&>div]:!p-0">
                {/* icons */}
                <GroupTuitButton tooltip="media">
                    <Icon
                        className="text-twitterBlue transition-colors duration-200 group-hover:text-twitterBlueHover"
                        height={20}
                        name="gallery"
                        width={20}
                    />
                </GroupTuitButton>
                <GroupTuitButton tooltip="GIF">
                    <Icon
                        className="text-twitterBlue transition-colors duration-200 group-hover:text-twitterBlueHover"
                        height={20}
                        name="gif"
                        width={20}
                    />
                </GroupTuitButton>
                <GroupTuitButton className="hidden xxs:block" tooltip="poll">
                    <Icon
                        className="text-twitterBlue transition-colors duration-200 group-hover:text-twitterBlueHover"
                        height={20}
                        name="poll"
                        width={20}
                    />
                </GroupTuitButton>
                <GroupTuitButton tooltip="emoji">
                    <Icon
                        className="text-twitterBlue transition-colors duration-200 group-hover:text-twitterBlueHover"
                        height={20}
                        name="emoji"
                        width={20}
                    />
                </GroupTuitButton>
                <GroupTuitButton
                    className="hidden xxs:block"
                    tooltip="schedule"
                >
                    <Icon
                        className="text-twitterBlue transition-colors duration-200 group-hover:text-twitterBlueHover"
                        height={20}
                        name="schedule"
                        width={20}
                    />
                </GroupTuitButton>
                <GroupTuitButton tooltip="tag location">
                    <Icon
                        className="text-twitterBlue transition-colors duration-200 group-hover:text-twitterBlueHover"
                        height={20}
                        name="location"
                        width={20}
                    />
                </GroupTuitButton>
            </div>
            <div>
                <button
                    className={clsx(
                        'rounded-full bg-twitterBlue px-3 py-1 transition-all duration-200 hover:bg-twitterBlueHover',
                        'disabled:opacity-60 disabled:hover:bg-twitterBlue',
                    )}
                    disabled={tuitContent.length === 0}
                    onClick={doTuit}
                >
                    <span className="mx-3 text-base font-bold text-white">
                        Tweet
                    </span>
                </button>
            </div>
        </div>
    );
};

export default WriteTuitIconsAndButton;
