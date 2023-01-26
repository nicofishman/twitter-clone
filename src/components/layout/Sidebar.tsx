import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { signIn, useSession } from 'next-auth/react';

import Icon from '../common/Icon';
import { tw } from '../../utils/tw';
import ProfileButton from '../sidebar/ProfileButton';
import { api } from '../../utils/api';
import { globalUser } from '../../utils/globalState';

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = () => {
    const router = useRouter();
    const {
        data: session,
    } = useSession();

    const { data: doesUserExist } = api.user.getByEmail.useQuery({
        email: session?.user?.email ?? '',
    });
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
            } else {
                globalUser.setAll(doesUserExist);
            }
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doesUserExist, router, router.query.signedIn]);

    return (
        <div className='h-full flex flex-col justify-between items-start xl:w-[275px] w-[88px] px-3'>

            {
                session ? (
                    <>
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

                            <Link className='group w-full justify-center xl:justify-start flex' href={`/${session.user?.id}`}>
                                <NavButton>
                                    <Icon name={router.pathname === '/[profileName]' ? 'personFill' : 'person'} />
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
                        <ProfileButton />
                    </>
                ) : (
                    <>
                        <div className="flex-1" />
                        <div className='flex flex-col xl:items-start items-center w-full self-end'>
                            <button className='group w-full justify-center xl:justify-start flex' onClick={handleSignIn}>
                                <NavButton>
                                    <Icon name='person' />
                                    <span className='text-xl'>Login with google</span>
                                </NavButton>
                            </button>
                        </div>
                    </>

                )
            }
        </div>
    );
};

export default Sidebar;

export const NavButton = tw.div`
flex items-center p-3 rounded-full w-fit my-1.5
xl:items-start
group-hover:bg-lightGray/10 transition-colors duraiton-200 cursor-pointer
[&>span]:px-5 [&>span]:xl:block [&>span]:hidden
`;
