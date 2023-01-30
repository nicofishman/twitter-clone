import Link from 'next/link';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Icon from '@/components/common/Icon';

import { NavButton } from './Sidebar';



interface BottomSidebarProps {

}

const BottomSidebar: FC<BottomSidebarProps> = () => {
    const router = useRouter();

    return (
        <nav className='flex xxs:hidden justify-around fixed bottom-0 bg-black w-full h-14 border-t border-t-borderGray'>
            <Link className='group w-full justify-center xl:justify-start flex' href={'/'}>
                <NavButton>
                    <Icon name={router.pathname === '/' ? 'homeFill' : 'home'} />
                </NavButton>
            </Link>
            <Link className='group w-full justify-center xl:justify-start flex' href={'/explore'}>
                <NavButton>
                    <Icon name={router.pathname === '/explore' ? 'searchFill' : 'search'} />
                </NavButton>
            </Link>
            <Link className='group w-full justify-center xl:justify-start flex' href={'/notifications'}>
                <NavButton>
                    <Icon name={router.pathname === '/notifications' ? 'notificationFill' : 'notification'} />
                </NavButton>
            </Link>
            <Link className='group w-full justify-center xl:justify-start flex' href={'/messages'}>
                <NavButton>
                    <Icon name={router.pathname === '/messages' ? 'directMessageFill' : 'directMessage'} />
                </NavButton>
            </Link>
        </nav>
    );
};

export default BottomSidebar;
