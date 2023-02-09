import React, { FC } from 'react';
import { signOut } from 'next-auth/react';

import { NavButton } from '@/components/layout/Sidebar';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';
import { useUser } from '@/utils/globalState';

interface ProfileButtonProps {}

const ProfileButton: FC<ProfileButtonProps> = () => {
    const user = useUser();

    return (
        <div className='mb-3 w-full'>
            <NavButton className='!w-full !flex-wrap items-center !justify-center !p-0 md:justify-between'>
                <Avatar user={user} />
                <div className='ml-3 hidden flex-col overflow-x-hidden xl:flex'>
                    <span className='truncate pr-2 text-base font-bold'>
                        {user.full_name}
                    </span>
                    <span className='truncate text-sm font-normal text-textGray'>
                        @{user.username}
                    </span>
                </div>
                <Icon
                    className='hidden w-5 translate-y-1/4 xl:block'
                    name='threeDots'
                    onClick={() => signOut()}
                />
            </NavButton>
        </div>
    );
};

export default ProfileButton;
