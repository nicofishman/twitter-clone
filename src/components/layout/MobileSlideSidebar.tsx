import React, { forwardRef } from 'react';

import Icon from '../common/Icon';
import Avatar from '../common/Avatar';

import { slideNavbarOpenStore } from '@/utils/states/slideNavbarOpen';
import { useUser } from '@/utils/globalState';

interface MobileSlideSidebarProps {
}

const MobileSlideSidebar = forwardRef<HTMLDivElement, MobileSlideSidebarProps>((props, ref) => {
    const user = useUser();

    return (
        <div ref={ref} {...props} className='h-screen bg-black w-[280px]'>
            <div className='px-4 pt-4 flex justify-between text-white font-semibold'>
                <p>Account info</p>
                <button onClick={() => slideNavbarOpenStore.set('isOpen', false)}>
                    <Icon className='w-5' name='cross' />
                </button>
            </div>
            <div className="p-4 w-full flex flex-col">
                <div className="w-full flex justify-between">
                    <Avatar alt={`${user.full_name} profile picture`} src={user.image} width={40} />
                    <button className='border border-white rounded-full aspect-square p-2 h-fit'>
                        <Icon className='w-5' name='plus' />
                    </button>
                </div>
                <span className='font-bold text-base text-white mt-1 w-full'>{user.full_name}</span>
                <span className='text-textGray text-base w-full'>@{user.username}</span>
            </div>
        </div>
    );
});

export default MobileSlideSidebar;

MobileSlideSidebar.displayName = 'MobileSlideSidebar';
