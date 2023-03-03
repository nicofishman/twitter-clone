import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TwitterUser } from '@prisma/client';
import { add, format } from 'date-fns';

import { api } from '@/utils/api';
import Modal from '@/components/ui/Modal';
import Icon from '@/components/ui/Icon';
import Avatar from '@/components/ui/Avatar';

import { modalsStore } from './Layout';
import Input from './editProfileModal/Input';
import Textarea from './editProfileModal/Textarea';

interface EditProfileModalProps {}

const EditProfileModal = ({}: EditProfileModalProps) => {
    const [profile] = modalsStore.use('editProfile');
    const [profileState, setProfileState] = useState<
        Omit<TwitterUser, 'birthDate'> & { birthDate: string }
    >({
        ...profile,
        birthDate: format(
            add(profile?.birthDate ?? 0, { days: 1 }),
            'yyyy-MM-dd',
        ),
    } as Required<Omit<TwitterUser, 'birthDate'> & { birthDate: string }>);

    const utils = api.useContext();

    const updateMutation = api.user.update.useMutation({
        onSettled: () => {
            utils.user.getByUsername.invalidate({
                username: profile?.username ?? '',
            });
        },
    });

    useEffect(() => {
        if (!profile || !profile.birthDate) return;
        setProfileState({
            ...profile,
            birthDate: format(
                add(profile.birthDate, { days: 1 }),
                'yyyy-MM-dd',
            ),
        });
    }, [profile]);

    if (!profile) return null;

    const handleSave = async () => {
        await updateMutation.mutateAsync({
            ...profileState,
            birthDate: new Date(profileState.birthDate),
        });
        modalsStore.set('editProfile', null);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!profile) return;

        setProfileState({
            ...profileState,
            birthDate: e.target.value,
        });
    };

    const handleChanges = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (!profile) return;

        setProfileState({
            ...profileState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Modal
            className='flex h-[650px] flex-col'
            closeModal={() => modalsStore.set('editProfile', null)}
            isOpen={profile !== null}
            position='center'
        >
            <header className='flex w-full items-center justify-between gap-x-4 px-4 py-2'>
                <button
                    className='m-2 h-fit w-fit'
                    onClick={() => modalsStore.set('editProfile', null)}
                >
                    <Icon className='w-5 text-white' name='cross' />
                </button>
                <h1 className='flex-1 text-xl font-bold'>Edit profile</h1>
                <button
                    className='my-2 h-fit w-fit rounded-full bg-white px-4 py-1 font-bold text-black'
                    onClick={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    Save
                </button>
            </header>

            <div className='flex-1 overflow-y-scroll pb-5'>
                <Image
                    priority
                    alt='Banner image'
                    className='w-full'
                    height={200}
                    src={'http://via.placeholder.com/600x200'}
                    width={600}
                />
                <div className='flex w-full flex-col px-2'>
                    <div className='my-3 flex max-h-[calc(133px/2)] w-full justify-between'>
                        <Avatar
                            className='-translate-y-1/2 border-4 border-black'
                            user={profile}
                            width={133}
                        />
                    </div>
                    <div className='flex flex-col gap-y-6'>
                        <Input
                            maxLength={50}
                            name='full_name'
                            placeholder='Name'
                            value={profileState.full_name ?? ''}
                            onChange={handleChanges}
                        />
                        <Textarea
                            className='h-20 resize-none overflow-y-auto pt-4'
                            maxLength={160}
                            name='description'
                            placeholder='Bio'
                            value={profileState.description ?? ''}
                            onChange={handleChanges}
                        />
                        <Input
                            name='birthDate'
                            placeholder='Birth Date'
                            type='date'
                            value={profileState.birthDate ?? '2000-01-01'}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileModal;
