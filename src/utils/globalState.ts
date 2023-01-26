import { TwitterUser } from "@prisma/client";

import { createGlobalStore } from "./createGlobalStore";

const initialState = {
    id: '0',
    email: "",
    full_name: "",
    username: "",
    image: "",
} satisfies TwitterUser;

export const globalUser = createGlobalStore(initialState);

export const useUser = () => {
    return globalUser.useAll();
};