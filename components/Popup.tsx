import { Transition } from '@headlessui/react'
import { useEffect } from 'react';

export default function Popup(props: {
    className?: string,
    showing: boolean,
    hide: () => void,
    message: string,
    time: number,
}) {
    const {className, showing, hide, message, time} = props;

    useEffect(() => {
        if (showing) {
            setTimeout(() => {
                hide();
            }, time);
        }
    }, [showing]);

    return (
        <Transition
            show={showing}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
        >
            <div className={className}>
                {message}
            </div>
        </Transition>
    )
}