import Link from 'next/link';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Icon from '../common/Icon';
import { tw } from '../../utils/tw';

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = () => {
    const router = useRouter();

    return (
        <div className='h-full flex flex-col justify-between items-start xl:w-[275px] w-[88px] px-3'>
            <div className='flex flex-col xl:items-start items-center w-full'>
                <h1 className='py-0.5'>
                    <Link href={'/'}>
                        <Icon className='m-2' name='twitter'  />
                    </Link>
                </h1>
                <Link className='group w-full justify-center xl:justify-start flex' href={'/'}>
                    <NavButton>
                        <Icon name={router.pathname === '/' ? 'homeFill' : 'home'} />
                        <span className={clsx('text-xl', router.pathname === '/' && 'font-bold')}>Home</span>
                    </NavButton>
                </Link>

                <Link className='group w-full justify-center xl:justify-start flex' href={'/explore'}>
                    <NavButton>
                        <Icon name={router.pathname === '/explore' ? 'hashtagFill' : 'hashtag'} />
                        <span className={clsx('text-xl', router.pathname === '/explore' && 'font-bold')}>Explore</span>
                    </NavButton>
                </Link>

                <Link className='group w-full justify-center xl:justify-start flex' href={'/notifications'}>
                    <NavButton>
                        <Icon name={router.pathname === '/notifications' ? 'notificationFill' : 'notification'} />
                        <span className={clsx('text-xl', router.pathname === '/notifications' && 'font-bold')}>Notifications</span>
                    </NavButton>
                </Link>

                <Link className='group w-full justify-center xl:justify-start flex' href={'/messages'}>
                    <NavButton>
                        <Icon name={router.pathname === '/messages' ? 'directMessageFill' : 'directMessage'} />
                        <span className={clsx('text-xl', router.pathname === '/messages' && 'font-bold')}>Messages</span>
                    </NavButton>
                </Link>

                <Link className='group w-full justify-center xl:justify-start flex' href={'/bookmarks'}>
                    <NavButton>
                        <Icon name={router.pathname === '/bookmarks' ? 'savedFill' : 'saved'} />
                        <span className={clsx('text-xl', router.pathname === '/bookmarks' && 'font-bold')}>Bookmarks</span>
                    </NavButton>
                </Link>

                <Link className='group w-full justify-center xl:justify-start flex' href={'/lists'}>
                    <NavButton>
                        <Icon name={router.pathname === '/lists' ? 'listFill' : 'list'} />
                        <span className={clsx('text-xl', router.pathname === '/lists' && 'font-bold')}>Lists</span>
                    </NavButton>
                </Link>

                <Link className='group w-full justify-center xl:justify-start flex' href={'/profile'}>
                    <NavButton>
                        <Icon name={router.pathname === '/profile' ? 'personFill' : 'person'} />
                        <span className={clsx('text-xl', router.pathname === '/profile' && 'font-bold')}>Profile</span>
                    </NavButton>
                </Link>
                <Link className='group' href="/">
                    <NavButton>
                        <Icon name='threeDotsCircle' />
                        <span className='text-xl'>More</span>
                    </NavButton>
                </Link>

                {/* Tweet Button */}
                <NavButton className='bg-twitterBlue hover:bg-twitterBlueHover text-lightGray !w-full xl:aspect-auto aspect-square justify-center'>
                    <span className='font-bold text-lg'>Tweet</span>
                    <Icon className='xl:hidden block' name='featherAdd'/>
                </NavButton>
            </div>
            <div className='mb-3 w-full'>
                <NavButton className='!w-full justify-between'>
                    <div className='flex items-center'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt='Profile picture' className='rounded-full h-full' height={40} src='https://via.placeholder.com/40' width={40} />
                        <div className='xl:flex flex-col mx-3 hidden'>
                            <span className='text-base font-bold'>Name</span>
                            <span className='text-sm font-normal text-textGray'>@username</span>
                        </div>
                    </div>
                    <Icon className='xl:block hidden translate-y-1/4' name='threeDots' />
                </NavButton>
            </div>
        </div>
    );
};

export default Sidebar;

const NavButton = tw.div`
flex items-center p-3 rounded-full w-fit my-1.5
xl:items-start
group-hover:bg-lightGray/10 transition-colors duraiton-200 cursor-pointer
[&>span]:px-5 [&>span]:xl:block [&>span]:hidden
`;
