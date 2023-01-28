import React, { FC } from 'react';

import Sidebar from './Sidebar';

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen h-screen w-full flex bg-black text-lightGray font-twitter overflow-auto">
            <div className="flex-1 h-screen sticky left-0 top-0 min-w-[68px] justify-end [@media(min-width:500px)]:flex hidden">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full max-w-[600px] mx-auto min-h-screen">
                {children}
            </div>
            <div className="flex-1 h-full sticky left-0 top-0 min-w-0 overflow-hidden">SIDEBAR</div>
        </div>
    );
};

export default Layout;
