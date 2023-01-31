import React, { FC, Fragment, PropsWithChildren } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import clsx from 'clsx';

interface ModalProps extends PropsWithChildren<{}> {
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
    position?: 'top' | 'bottom' | 'center';
}

const Modal: FC<ModalProps> = ({
    closeModal,
    isOpen,
    children,
    className = '',
    position,
}) => {
    const positionClasses: Record<NonNullable<typeof position>, string> = {
        top: 'top-[5%]',
        bottom: 'bottom-[5%]',
        center: 'inset-y-0',
    };

    return (
        <Transition appear as={Fragment} show={isOpen}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-modalBackground" />
                </Transition.Child>

                <div
                    className={clsx(
                        'fixed inset-x-0 overflow-y-auto',
                        position
                            ? positionClasses[position]
                            : positionClasses['center'],
                    )}
                >
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={clsx(
                                    className,
                                    'w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black text-left align-middle text-white shadow-xl transition-all',
                                )}
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
