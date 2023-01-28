import React, { FC } from 'react';
import { signOut } from 'next-auth/react';

import { NavButton } from '@/components/layout/Sidebar';
import Icon from '@/components/common/Icon';
import Avatar from '@/components/common/Avatar';
import { useUser } from '@/utils/globalState';

interface ProfileButtonProps {

}

const ProfileButton: FC<ProfileButtonProps> = () => {
    const user = useUser();    

    return (
        <div className='mb-3 w-full'>
            <NavButton className='!w-full !p-0 !flex-wrap !justify-center md:justify-between'>
                <Avatar alt={`${user.username}'s profile picture`} src={user.image}/>
                <div className='xl:flex flex-col ml-3 hidden overflow-x-hidden'>
                    <span className='text-base font-bold truncate pr-2'>{user.full_name}</span>
                    <span className='text-sm font-normal text-textGray truncate'>@{user.username}</span>
                </div>
                <Icon className='xl:block hidden translate-y-1/4' name='threeDots' onClick={() => signOut()} />
            </NavButton>
        </div>
    );
};

export default ProfileButton;

