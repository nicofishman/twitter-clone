import React, { FC } from 'react';

import Sidebar from './Sidebar';

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen h-screen w-full flex bg-black text-lightGray font-twitter overflow-auto">
            <div className="flex flex-1 h-full min-w-[68px] justify-end">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full max-w-[600px] mx-auto h-full border-l border-r border-borderGray">
                {children}
            </div>
            <div className="flex-1 h-full min-w-0 overflow-hidden">SIDEBAR</div>
        </div>
    );
};

export default Layout;
