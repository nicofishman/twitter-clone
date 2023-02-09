import React from 'react';
import { signOut } from 'next-auth/react';

import { useUser } from '@/utils/globalState';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/Dropdown';

import ProfileButton from './ProfileButton';

interface DropdownProfileButtonProps {}

const DropdownProfileButton = ({}: DropdownProfileButtonProps) => {
    const user = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-full outline-none'>
                <ProfileButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='center'
                className='mx-2 min-w-[300px] max-w-[calc(100%-8px)]'
                onClick={(e) => e.preventDefault()}
            >
                <DropdownMenuItem
                    className='py-3 px-4 transition-colors focus:bg-white/[0.06]'
                    onClick={() => signOut()}
                >
                    <button className='w-full text-left text-base font-bold text-white'>
                        <span className='break-words leading-5'>
                            Log out @{user.username}
                        </span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownProfileButton;
