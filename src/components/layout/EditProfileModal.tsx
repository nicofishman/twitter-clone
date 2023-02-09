import React from 'react';

import Modal from '../ui/Modal';
import Icon from '../ui/Icon';

import { modalsStore } from './Layout';

interface EditProfileModalProps {}

const EditProfileModal = ({}: EditProfileModalProps) => {
    const [profile] = modalsStore.use('editProfile');

    return (
        <Modal
            className='h-[650px]'
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
                        console.log('saved');
                    }}
                >
                    Save
                </button>
            </header>
        </Modal>
    );
};

export default EditProfileModal;
