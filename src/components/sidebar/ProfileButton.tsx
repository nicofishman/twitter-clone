import React, { FC } from 'react';
import { signOut } from 'next-auth/react';

import { NavButton } from '../layout/Sidebar';
import Icon from '../common/Icon';
import { useUser } from '../../utils/globalState';
import Avatar from '../common/Avatar';

interface ProfileButtonProps {

}

const ProfileButton: FC<ProfileButtonProps> = () => {
    const user = useUser();    

    return (
        <div className='mb-3 w-full'>
            <NavButton className='!w-full justify-between'>
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

