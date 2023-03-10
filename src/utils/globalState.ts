import { TwitterUser } from '@prisma/client';

import { createGlobalStore } from './createGlobalStore';

const initialState = {
    id: '',
    email: '',
    full_name: '',
    username: '',
    image: '',
    description: '' as TwitterUser['description'],
    birthDate: null as TwitterUser['birthDate'],
    createdAt: new Date(),
} satisfies TwitterUser;

export const globalUser = createGlobalStore(initialState);

export const useUser = () => {
    return globalUser.useAll();
};
