import React, { FC, ReactNode, memo } from 'react';
import clsx from 'clsx';

import { RouterOutputs, api } from '@/utils/api';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/Dropdown';
import Icon from '@/components/ui/Icon';

import ThreeDotsButton from './ThreeDotsButton';

interface DropdownThreeDotsProps {
    isSelfUser?: boolean;
    tuit: NonNullable<RouterOutputs['tuit']['getById']>;
}

type DropdownItems = {
    id: string;
    label: string;
    onClick: () => void;
    icon?: ReactNode;
};

const DropdownThreeDots: FC<DropdownThreeDotsProps> = ({
    isSelfUser = false,
    tuit,
}) => {
    const utils = api.useContext();
    const deleteTuitMutation = api.tuit.delete.useMutation({
        onSuccess: () => {
            utils.tuit.get.invalidate();
            utils.tuit.getFeedByUsername.invalidate({
                username: tuit.author.username,
            });
            utils.tuit.getById.invalidate({
                id: tuit.replyToId || tuit.id,
            });
            utils.tuit.getComments.invalidate({
                tuitId: tuit.replyToId || tuit.id,
            });
        },
    });

    const selfDropdownItems: DropdownItems[] = [
        {
            id: 'delete',
            label: 'Delete Tweet',
            onClick: () =>
                deleteTuitMutation.mutate({
                    userId: tuit?.authorId,
                    id: tuit.id,
                }),
            icon: <Icon className='w-5 text-red-500' name='trash' />,
        },
        {
            id: 'add_to_list',
            label: `Add/Remove @${tuit.author.username} from Lists`,
            onClick: () =>
                console.log(`Add/Remove @${tuit.author.username} from Lists`),
            icon: <Icon className='w-5 text-white' name='addToList' />,
        },
        {
            id: 'change_who_can_reply',
            label: 'Change who can reply',
            onClick: () => console.log('Change who can reply'),
            icon: <Icon className='w-5 text-white' name='comment' />,
        },
        {
            id: 'embed',
            label: 'Embed Tweet',
            onClick: () => console.log('Embed Tweet'),
            icon: <Icon className='w-5 text-white' name='embed' />,
        },
        {
            id: 'view_analytics',
            label: 'View Tweet analytics',
            onClick: () => console.log('View Tweet analytics'),
            icon: <Icon className='w-5 text-white' name='analytics' />,
        },
    ];
    const otherDropdownItems: DropdownItems[] = [
        {
            id: 'notinterested',
            label: 'Not interested in this Tweet',
            onClick: () => console.log('Not interested in this Tweet'),
            icon: <Icon className='w-5 text-white' name='notInterested' />,
        },
        {
            id: 'unfollow',
            label: `Unfollow @${tuit.author.username}`,
            onClick: () => console.log(`Unfollow @${tuit.author.username}`),
            icon: <Icon className='w-5 text-white' name='unfollow' />,
        },
        {
            id: 'add_to_list',
            label: `Add/Remove @${tuit.author.username} from Lists`,
            onClick: () =>
                console.log(`Add/Remove @${tuit.author.username} from Lists`),
            icon: <Icon className='w-5 text-white' name='addToList' />,
        },
        {
            id: 'mute',
            label: `Mute @${tuit.author.username}`,
            onClick: () => console.log(`Mute @${tuit.author.username}`),
            icon: <Icon className='w-5 text-white' name='mute' />,
        },
        {
            id: 'block',
            label: `Block @${tuit.author.username}`,
            onClick: () => console.log(`Block @${tuit.author.username}`),
            icon: <Icon className='w-5 text-white' name='block' />,
        },
        {
            id: 'embed',
            label: 'Embed Tweet',
            onClick: () => console.log('Embed Tweet'),
            icon: <Icon className='w-5 text-white' name='embed' />,
        },
        {
            id: 'report',
            label: 'Report Tweet',
            onClick: () => console.log('Report Tweet'),
            icon: <Icon className='w-5 text-white' name='report' />,
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ThreeDotsButton hasDropdown />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='mx-2 min-w-[350px] max-w-[calc(100%-8px)]'
                onClick={(e) => e.preventDefault()}
            >
                <div className='flex flex-col'>
                    {(isSelfUser ? selfDropdownItems : otherDropdownItems).map(
                        (item) => (
                            <MyDropdownItem key={item.id} item={item} />
                        ),
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownThreeDots;

const MyDropdownItem = memo(({ item }: { item: DropdownItems }) => {
    return (
        <DropdownMenuItem
            className='py-3 px-4 transition-colors focus:bg-white/[0.06]'
            onClick={item.onClick}
        >
            <button
                className={clsx(
                    'w-full text-left text-base font-bold text-white',
                    {
                        'flex items-center gap-x-3': item.icon,
                    },
                    {
                        'text-red-500': item.id === 'delete',
                    },
                )}
            >
                {item.icon}
                <span className='break-words leading-5'>{item.label}</span>
            </button>
        </DropdownMenuItem>
    );
});

MyDropdownItem.displayName = 'MyDropdownItem';
