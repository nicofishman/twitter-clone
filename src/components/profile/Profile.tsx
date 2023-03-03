import React from 'react';
import { add, format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { RouterOutputs } from '@/utils/api';
import { useUser } from '@/utils/globalState';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';
import { modalsStore } from '@/components/layout/Layout';

interface ProfileProps {
    profile: NonNullable<RouterOutputs['user']['getByUsername']>;
}

const Profile = ({ profile }: ProfileProps) => {
    const user = useUser();
    const router = useRouter();

    const birthDate = profile?.birthDate
        ? format(
              add(profile.birthDate, {
                  days: 1,
              }),
              'MMM dd, yyyy',
          )
        : null;

    const joinedDate = format(profile?.createdAt ?? 0, 'MMMM yyyy');

    return (
        <>
            <header className='sticky top-0 z-20 flex max-h-[53px] w-full items-center gap-x-6 bg-black/60 px-4 backdrop-blur-md'>
                <button onClick={() => router.back()}>
                    <Icon className='w-5 text-white' name='leftArrow' />
                </button>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>{profile?.full_name}</h1>
                    <p className='text-sm text-gray-400'>
                        {profile._count.tuits} Tweets{' '}
                    </p>
                </div>
            </header>
            <Image
                priority
                alt='Banner image'
                height={200}
                src={'http://via.placeholder.com/600x200'}
                width={600}
            />
            <div className='flex w-full flex-col px-4'>
                <div className='my-3 flex max-h-[calc(133px/2)] w-full justify-between'>
                    <Avatar
                        className='-translate-y-1/2 border-4 border-black'
                        user={profile}
                        width={133}
                    />
                    {user.id === profile.id && (
                        <button
                            className='h-fit rounded-full border border-white py-1.5 px-4 text-white'
                            onClick={() =>
                                modalsStore.set('editProfile', profile)
                            }
                        >
                            <span className='font-bold'>Edit Profile</span>
                        </button>
                    )}
                </div>
                <div className='flex flex-col'>
                    <p className='text-xl font-bold'>{profile.username}</p>
                    <p className='font-normal text-textGray'>
                        @{profile.username}
                    </p>
                </div>
                {profile.description !== '' && profile.description && (
                    <p className='py-3'>{profile.description}</p>
                )}
                <div className='flex gap-x-3'>
                    {birthDate && (
                        <p className='flex gap-x-1'>
                            <Icon className='w-4 text-textGray' name='ballon' />
                            <span className='text-textGray'>
                                Born {birthDate}
                            </span>
                        </p>
                    )}
                    <p className='flex gap-x-1'>
                        <Icon className='w-4 text-textGray' name='calendar' />
                        <span className='text-textGray'>
                            Joined {joinedDate}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Profile;
