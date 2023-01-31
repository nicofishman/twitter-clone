import Link from 'next/link';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Icon from '@/components/ui/Icon';

import { NavButton } from './Sidebar';

interface BottomSidebarProps {}

const BottomSidebar: FC<BottomSidebarProps> = () => {
    const router = useRouter();

    return (
        <nav className="sticky bottom-0 flex h-14 w-full justify-around border-t border-t-borderGray bg-black xxs:hidden">
            <Link
                className="group flex w-full justify-center xl:justify-start"
                href={'/'}
            >
                <NavButton>
                    <Icon
                        name={router.pathname === '/' ? 'homeFill' : 'home'}
                    />
                </NavButton>
            </Link>
            <Link
                className="group flex w-full justify-center xl:justify-start"
                href={'/explore'}
            >
                <NavButton>
                    <Icon
                        name={
                            router.pathname === '/explore'
                                ? 'searchFill'
                                : 'search'
                        }
                    />
                </NavButton>
            </Link>
            <Link
                className="group flex w-full justify-center xl:justify-start"
                href={'/notifications'}
            >
                <NavButton>
                    <Icon
                        name={
                            router.pathname === '/notifications'
                                ? 'notificationFill'
                                : 'notification'
                        }
                    />
                </NavButton>
            </Link>
            <Link
                className="group flex w-full justify-center xl:justify-start"
                href={'/messages'}
            >
                <NavButton>
                    <Icon
                        name={
                            router.pathname === '/messages'
                                ? 'directMessageFill'
                                : 'directMessage'
                        }
                    />
                </NavButton>
            </Link>
        </nav>
    );
};

export default BottomSidebar;
