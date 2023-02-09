import React, { FC } from 'react';
import clsx from 'clsx';
import { TwitterUser } from '@prisma/client';

import { slideNavbarOpenStore } from '@/utils/states/slideNavbarOpen';
import { createGlobalStore } from '@/utils/createGlobalStore';
import { RouterOutputs } from '@/utils/api';

import SlideNavbar from '../ui/SlideNavbar';

import Sidebar from './Sidebar';
import MobileSlideSidebar from './MobileSlideSidebar';
import TuitModal from './TuitModal';
import ReplyModal from './ReplyModal';
import EditProfileModal from './EditProfileModal';

export const modalsStore = createGlobalStore({
    writeTuit: false,
    reply: null as null | Omit<
        RouterOutputs['tuit']['get'][number],
        'comments'
    >,
    editProfile: null as null | TwitterUser,
});

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const [isSlideNavbarOpen, openSlideNavbar] =
        slideNavbarOpenStore.use('isOpen');
    const [isTuitModalOpen] = modalsStore.use('writeTuit');

    return (
        <div
            className={clsx(
                'flex h-screen min-h-screen w-full bg-black font-twitter text-lightGray',
                isTuitModalOpen ? 'overflow-y-hidden' : 'overflow-y-auto',
            )}
        >
            <div className='sticky left-0 top-0 hidden h-screen min-w-[68px] flex-1 justify-end xxs:flex'>
                <Sidebar />
            </div>
            <SlideNavbar open={isSlideNavbarOpen} setOpen={openSlideNavbar}>
                <MobileSlideSidebar />
            </SlideNavbar>
            <div
                className={clsx(
                    'mx-auto flex h-fit min-h-screen w-full max-w-[600px] flex-col border-x border-borderGray',
                )}
            >
                {children}
            </div>
            <div className='sticky left-0 top-0 h-full min-w-0 flex-1 overflow-hidden'>
                SIDEBAR
            </div>

            <TuitModal />
            <ReplyModal />
            <EditProfileModal />
        </div>
    );
};

export default Layout;
