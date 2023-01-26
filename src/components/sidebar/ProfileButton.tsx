import React, { FC } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { NavButton } from '../layout/Sidebar';
import Icon from '../common/Icon';
import { useUser } from '../../utils/globalState';

interface ProfileButtonProps {

}

const ProfileButton: FC<ProfileButtonProps> = () => {
    const user = useUser();

    return (
        <div className='mb-3 w-full'>
            <NavButton className='!w-full justify-between'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image alt='Profile picture' className='rounded-full h-full' height={40} src={user.image !== '' ? user.image : 'https://via.placeholder.com/40'} width={40} />
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

