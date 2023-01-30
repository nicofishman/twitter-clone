import React, { FC } from 'react';
import clsx from 'clsx';

import { slideNavbarOpenStore } from '@/utils/states/slideNavbarOpen';
import { createGlobalStore } from "@/utils/createGlobalStore";

import SlideNavbar from '../ui/SlideNavbar';

import Sidebar from './Sidebar';
import MobileSlideSidebar from './MobileSlideSidebar';
import TuitModal from './TuitModal';

export const tuitModalStore = createGlobalStore({
    isOpen: false,
});

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const [isSlideNavbarOpen, openSlideNavbar] = slideNavbarOpenStore.use('isOpen');
    const [isTuitModalOpen] = tuitModalStore.use('isOpen');
    

    return (
        <div className={clsx("min-h-screen h-screen w-full flex bg-black text-lightGray font-twitter", isTuitModalOpen ? 'overflow-y-hidden' : 'overflow-y-auto')}>
            <div className="flex-1 h-screen sticky left-0 top-0 min-w-[68px] justify-end xxs:flex hidden">
                <Sidebar />
            </div>
            <SlideNavbar open={isSlideNavbarOpen} setOpen={openSlideNavbar}>
                <MobileSlideSidebar />
            </SlideNavbar>
            <div className={clsx("flex flex-col w-full max-w-[600px] mx-auto min-h-screen h-fit border-x border-borderGray")}>
                {children}
            </div>
            <div className="flex-1 h-full sticky left-0 top-0 min-w-0 overflow-hidden">SIDEBAR</div>

            <TuitModal />
        </div>
    );
};

export default Layout;
