import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface TabsProps {
    active: string;
    username: string;
}

const Tabs = ({ active, username }: TabsProps) => {
    return (
        <div className='mt-4 flex h-[53px] w-full justify-between border-b border-b-borderGray'>
            <Link
                className='flex h-full items-center justify-center px-10 hover:bg-lightGray/10'
                href={`/${username}`}
            >
                <div className='relative'>
                    <p
                        className={clsx(
                            'whitespace-nowrap py-4 font-semibold text-textGray',
                            {
                                'font-bold text-white':
                                    active === '/[userName]',
                            },
                        )}
                    >
                        Tweets
                    </p>
                    {active === '/[userName]' && (
                        <div className='absolute bottom-0 mx-auto h-1 w-full rounded-full bg-blue-500' />
                    )}
                </div>
            </Link>
            <Link
                className='flex h-full items-center justify-center px-10 hover:bg-lightGray/10'
                href={`/${username}/with_replies`}
            >
                <div className='relative'>
                    <p
                        className={clsx(
                            'whitespace-nowrap py-4 font-semibold text-textGray',
                            {
                                'font-bold text-white':
                                    active === '/[userName]/with_replies',
                            },
                        )}
                    >
                        Tweets & replies
                    </p>
                    {active === '/[userName]/with_replies' && (
                        <div className='absolute bottom-0 mx-auto h-1 w-full rounded-full bg-blue-500' />
                    )}
                </div>
            </Link>
            <Link
                className='flex h-full items-center justify-center px-10 hover:bg-lightGray/10'
                href={`/${username}/media`}
            >
                <div className='relative'>
                    <p
                        className={clsx(
                            'whitespace-nowrap py-4 font-semibold text-textGray',
                            {
                                'font-bold text-white':
                                    active === '/[userName]/media',
                            },
                        )}
                    >
                        Media
                    </p>
                    {active === '/[userName]/media' && (
                        <div className='absolute bottom-0 mx-auto h-1 w-full rounded-full bg-blue-500' />
                    )}
                </div>
            </Link>
            <Link
                className='flex h-full items-center justify-center px-10 hover:bg-lightGray/10'
                href={`/${username}/likes`}
            >
                <div className='relative'>
                    <p
                        className={clsx(
                            'whitespace-nowrap py-4 font-semibold text-textGray',
                            {
                                'font-bold text-white':
                                    active === '/[userName]/likes',
                            },
                        )}
                    >
                        Likes
                    </p>
                    {active === '/[userName]/likes' && (
                        <div className='absolute bottom-0 mx-auto h-1 w-full rounded-full bg-blue-500' />
                    )}
                </div>
            </Link>
        </div>
    );
};

export default Tabs;
