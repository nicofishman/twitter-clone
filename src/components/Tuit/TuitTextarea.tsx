import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useRef } from 'react';

import useAutosizeTextArea from '@/hooks/useAutosizeTextarea';

interface TuitTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    doTuit: () => void;
    content: string;
    setContent: (content: string) => void;
}

const TuitTextarea: FC<TuitTextareaProps> = ({
    doTuit,
    content,
    setContent,
    className,
    ...rest
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, content);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                doTuit();
            }
        },
        [doTuit],
    );

    useEffect(() => {
        const curr = textAreaRef.current;

        if (curr) {
            textAreaRef.current.addEventListener('keydown', onKeyDown);
        }

        return () => {
            if (curr) {
                curr.removeEventListener('keydown', onKeyDown);
            }
        };
    }, [onKeyDown]);

    return (
        <textarea
            ref={textAreaRef}
            className={clsx(
                className,
                'min-h-[30px] w-full resize-none overflow-y-hidden break-words bg-transparent text-xl text-white placeholder:text-textGray focus:outline-none',
            )}
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            {...rest}
        />
    );
};

export default TuitTextarea;
