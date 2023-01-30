import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useRef } from 'react';

import useAutosizeTextArea from '@/hooks/useAutosizeTextarea';

interface TuitTextareaProps {
    doTuit: () => void;
    content: string;
    setContent: (content: string) => void;
}

const TuitTextarea: FC<TuitTextareaProps> = ({ doTuit, content, setContent }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, content);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            doTuit();
        }
    }, [doTuit]);

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
            className={clsx('focus:outline-none w-full resize-none text-xl text-white placeholder:text-textGray overflow-y-hidden break-words bg-transparent min-h-[30px]')} 
            placeholder="What's happening?"
            value={content}
            onChange={e => setContent(e.target.value)}
        />
    );
};

export default TuitTextarea;
