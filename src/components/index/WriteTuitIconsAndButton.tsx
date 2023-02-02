import { FC } from 'react';

import { GroupTuitButton } from '@/components/index/Tuit';
import Icon from '@/components/ui/Icon';

import DoTuitButton from '../Tuit/DoTuitButton';

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
            <DoTuitButton doTuit={doTuit} tuitContent={tuitContent}>
                Tweet
            </DoTuitButton>
        </div>
    );
};

export default WriteTuitIconsAndButton;
