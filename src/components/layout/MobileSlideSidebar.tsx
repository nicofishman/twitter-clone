import React, { forwardRef } from 'react';

import { slideNavbarOpenStore } from '@/utils/states/slideNavbarOpen';
import { useUser } from '@/utils/globalState';

import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';

interface MobileSlideSidebarProps {}

const MobileSlideSidebar = forwardRef<HTMLDivElement, MobileSlideSidebarProps>(
    (props, ref) => {
        const user = useUser();

        return (
            <div ref={ref} {...props} className="h-screen w-[280px] bg-black">
                <div className="flex justify-between px-4 pt-4 font-semibold text-white">
                    <p>Account info</p>
                    <button
                        onClick={() =>
                            slideNavbarOpenStore.set('isOpen', false)
                        }
                    >
                        <Icon className="w-5" name="cross" />
                    </button>
                </div>
                <div className="flex w-full flex-col p-4">
                    <div className="flex w-full justify-between">
                        <Avatar user={user} width={40} />
                        <button className="aspect-square h-fit rounded-full border border-white p-2">
                            <Icon className="w-5" name="plus" />
                        </button>
                    </div>
                    <span className="mt-1 w-full text-base font-bold text-white">
                        {user.full_name}
                    </span>
                    <span className="w-full text-base text-textGray">
                        @{user.username}
                    </span>
                </div>
            </div>
        );
    },
);

export default MobileSlideSidebar;

MobileSlideSidebar.displayName = 'MobileSlideSidebar';
