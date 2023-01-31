import React, { FC, ReactNode } from 'react';
import { TwitterUser } from '@prisma/client';
import clsx from 'clsx';

import { api } from '@/utils/api';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/Dropdown';
import Icon from '../ui/Icon';

import ThreeDotsButton from './ThreeDotsButton';

interface DropdownThreeDotsProps {
    isSelfUser?: boolean;
    tuitUser: TwitterUser;
    tuitId: string;
}

type DropdownItems = {
    id: string;
    label: string;
    onClick: () => void;
    icon?: ReactNode;
};

const DropdownThreeDots: FC<DropdownThreeDotsProps> = ({
    isSelfUser = false,
    tuitUser,
    tuitId,
}) => {
    const utils = api.useContext();
    const deleteTuitMutation = api.tuit.delete.useMutation({
        onSuccess: () => {
            utils.tuit.get.invalidate();
        },
    });

    const selfDropdownItems: DropdownItems[] = [
        {
            id: 'delete',
            label: 'Delete Tweet',
            onClick: () =>
                deleteTuitMutation.mutate({ userId: tuitUser.id, id: tuitId }),
            icon: <Icon className="w-5 text-red-500" name="trash" />,
        },
        {
            id: 'add_to_list',
            label: `Add/Remove @${tuitUser.username} from Lists`,
            onClick: () =>
                console.log(`Add/Remove @${tuitUser.username} from Lists`),
            icon: <Icon className="w-5 text-white" name="addToList" />,
        },
        {
            id: 'change_who_can_reply',
            label: 'Change who can reply',
            onClick: () => console.log('Change who can reply'),
            icon: <Icon className="w-5 text-white" name="comment" />,
        },
        {
            id: 'embed',
            label: 'Embed Tweet',
            onClick: () => console.log('Embed Tweet'),
            icon: <Icon className="w-5 text-white" name="embed" />,
        },
        {
            id: 'view_analytics',
            label: 'View Tweet analytics',
            onClick: () => console.log('View Tweet analytics'),
            icon: <Icon className="w-5 text-white" name="analytics" />,
        },
    ];
    const otherDropdownItems: DropdownItems[] = [
        {
            id: 'notinterested',
            label: 'Not interested in this Tweet',
            onClick: () => console.log('Not interested in this Tweet'),
            icon: <Icon className="w-5 text-white" name="notInterested" />,
        },
        {
            id: 'unfollow',
            label: `Unfollow @${tuitUser.username}`,
            onClick: () => console.log(`Unfollow @${tuitUser.username}`),
            icon: <Icon className="w-5 text-white" name="unfollow" />,
        },
        {
            id: 'add_to_list',
            label: `Add/Remove @${tuitUser.username} from Lists`,
            onClick: () =>
                console.log(`Add/Remove @${tuitUser.username} from Lists`),
            icon: <Icon className="w-5 text-white" name="addToList" />,
        },
        {
            id: 'mute',
            label: `Mute @${tuitUser.username}`,
            onClick: () => console.log(`Mute @${tuitUser.username}`),
            icon: <Icon className="w-5 text-white" name="mute" />,
        },
        {
            id: 'block',
            label: `Block @${tuitUser.username}`,
            onClick: () => console.log(`Block @${tuitUser.username}`),
            icon: <Icon className="w-5 text-white" name="block" />,
        },
        {
            id: 'embed',
            label: 'Embed Tweet',
            onClick: () => console.log('Embed Tweet'),
            icon: <Icon className="w-5 text-white" name="embed" />,
        },
        {
            id: 'report',
            label: 'Report Tweet',
            onClick: () => console.log('Report Tweet'),
            icon: <Icon className="w-5 text-white" name="report" />,
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ThreeDotsButton hasDropdown />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="mx-2 min-w-[350px] max-w-[calc(100%-8px)]"
                onClick={(e) => e.preventDefault()}
            >
                <div className="flex flex-col">
                    {(isSelfUser ? selfDropdownItems : otherDropdownItems).map(
                        (item) => (
                            <DropdownMenuItem
                                key={item.id}
                                className="py-3 px-4 transition-colors focus:bg-white/[0.06]"
                                onClick={item.onClick}
                            >
                                <button
                                    className={clsx(
                                        'w-full text-left text-base font-bold text-white',
                                        {
                                            'flex items-center gap-x-3':
                                                item.icon,
                                        },
                                        {
                                            'text-red-500':
                                                item.id === 'delete',
                                        },
                                    )}
                                >
                                    {item.icon}
                                    <span className="break-words leading-5">
                                        {item.label}
                                    </span>
                                </button>
                            </DropdownMenuItem>
                        ),
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownThreeDots;
