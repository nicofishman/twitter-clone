import { FC } from 'react';

import { NavButton } from '@/components/layout/Sidebar';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import { useUser } from '@/utils/globalState';

interface ProfileButtonProps {}

const ProfileButton: FC<ProfileButtonProps> = () => {
    const user = useUser();

    return (
        <NavButton className='!mb-3 !w-full flex-wrap !items-center !justify-around !px-0 hover:bg-lightGray/10 md:justify-between'>
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
            />
        </NavButton>
    );
};

export default ProfileButton;
