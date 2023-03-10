import clsx from 'clsx';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

import Icon from '@/components/ui/Icon';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import { globalUser, useUser } from '@/utils/globalState';
import DropdownProfileButton from '@/components/sidebar/DropdownProfileButton';

import { modalsStore } from './Layout';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const user = useUser();

    const { data: doesUserExist } = api.user.getByEmail.useQuery(
        { email: session?.user?.email },
        {
            refetchOnWindowFocus: false,
        },
    );
    const createUserMutation = api.user.create.useMutation();

    const handleSignIn = async () => {
        await signIn('google', {
            redirect: false,
            callbackUrl: 'http://localhost:3000?signedIn=true',
        });
    };

    const createUser = async () => {
        const newUser = await createUserMutation.mutateAsync({
            email: session?.user?.email ?? '',
            name: session?.user?.name ?? '',
            profilePicture: session?.user?.image ?? '',
        });

        globalUser.setAll(newUser);
    };

    useEffect(() => {
        if (router.query.signedIn) {
            if (!doesUserExist) {
                if (session?.user?.email) {
                    createUser();
                }
            }
        }
        if (doesUserExist) {
            globalUser.setAll(doesUserExist);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doesUserExist, router, router.query.signedIn]);

    return (
        <nav className='flex h-full w-[88px] flex-col items-start justify-between px-3 xl:w-[275px]'>
            {session ? (
                <>
                    <div className='flex w-full flex-col items-center xl:items-start'>
                        <h1 className='py-0.5'>
                            <Link href={'/'}>
                                <Icon className='m-2' name='twitter' />
                            </Link>
                        </h1>
                        <Link
                            className='group flex w-full justify-center xl:justify-start'
                            href={'/'}
                        >
                            <NavButton>
                                <Icon
                                    name={
                                        router.pathname === '/'
                                            ? 'homeFill'
                                            : 'home'
                                    }
                                />
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/' && 'font-bold',
                                    )}
                                >
                                    Home
                                </span>
                            </NavButton>
                        </Link>

                        <Link
                            className='group flex w-full justify-center xl:justify-start'
                            href={'/explore'}
                        >
                            <NavButton>
                                <Icon
                                    name={
                                        router.pathname === '/explore'
                                            ? 'hashtagFill'
                                            : 'hashtag'
                                    }
                                />
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/explore' &&
                                            'font-bold',
                                    )}
                                >
                                    Explore
                                </span>
                            </NavButton>
                        </Link>

                        <Link
                            className='group flex w-full justify-center xl:justify-start'
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
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/notifications' &&
                                            'font-bold',
                                    )}
                                >
                                    Notifications
                                </span>
                            </NavButton>
                        </Link>

                        <Link
                            className='group flex w-full justify-center xl:justify-start'
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
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/messages' &&
                                            'font-bold',
                                    )}
                                >
                                    Messages
                                </span>
                            </NavButton>
                        </Link>

                        <Link
                            className='group flex w-full justify-center xl:justify-start'
                            href={'/bookmarks'}
                        >
                            <NavButton>
                                <Icon
                                    name={
                                        router.pathname === '/bookmarks'
                                            ? 'savedFill'
                                            : 'saved'
                                    }
                                />
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/bookmarks' &&
                                            'font-bold',
                                    )}
                                >
                                    Bookmarks
                                </span>
                            </NavButton>
                        </Link>

                        <Link
                            className='group flex w-full justify-center xl:justify-start'
                            href={'/lists'}
                        >
                            <NavButton>
                                <Icon
                                    name={
                                        router.pathname === '/lists'
                                            ? 'listFill'
                                            : 'list'
                                    }
                                />
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/lists' &&
                                            'font-bold',
                                    )}
                                >
                                    Lists
                                </span>
                            </NavButton>
                        </Link>
                        <Link
                            className='group flex w-full justify-center xl:justify-start'
                            href={`/${user.username}`}
                        >
                            <NavButton>
                                <Icon
                                    name={
                                        router.pathname === '/[profileName]'
                                            ? 'personFill'
                                            : 'person'
                                    }
                                />
                                <span
                                    className={clsx(
                                        'text-xl',
                                        router.pathname === '/profile' &&
                                            'font-bold',
                                    )}
                                >
                                    Profile
                                </span>
                            </NavButton>
                        </Link>
                        <Link className='group' href='/'>
                            <NavButton>
                                <Icon name='threeDotsCircle' />
                                <span className='text-xl'>More</span>
                            </NavButton>
                        </Link>

                        {/* Tweet Button */}
                        <NavButton
                            className='aspect-square !w-full justify-center bg-twitterBlue text-lightGray hover:bg-twitterBlueHover xl:aspect-auto'
                            onClick={() => modalsStore.set('writeTuit', true)}
                        >
                            <span className='text-lg font-bold'>Tweet</span>
                            <Icon
                                className='block xl:hidden'
                                name='featherAdd'
                            />
                        </NavButton>
                    </div>
                    <div className='w-full'>
                        <DropdownProfileButton />
                    </div>
                </>
            ) : (
                <>
                    <div className='flex-1' />
                    <div className='flex w-full flex-col items-center self-end xl:items-start'>
                        <button
                            className='group flex w-full justify-center xl:justify-start'
                            onClick={handleSignIn}
                        >
                            <NavButton>
                                <Icon name='google' />
                                <span className='text-xl'>
                                    Login with google
                                </span>
                            </NavButton>
                        </button>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Sidebar;

interface NavButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export const NavButton = ({
    children,
    className,
    ...props
}: NavButtonProps) => {
    return (
        <div
            {...props}
            className={cn(
                className,
                'my-1.5 flex w-fit items-center rounded-full p-3',
                'xl:items-start',
                'duraiton-200 cursor-pointer transition-colors group-hover:bg-lightGray/10',
                '[&>span]:hidden [&>span]:px-5 [&>span]:xl:block',
            )}
        >
            {children}
        </div>
    );
};
