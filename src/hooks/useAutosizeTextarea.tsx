import { useEffect } from 'react';

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    ...thingsThatChange: any
) => {
    useEffect(() => {
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = '0px';
            textAreaRef.focus();

            const scrollHeight = textAreaRef.scrollHeight;

            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            textAreaRef.style.height = scrollHeight + 'px';
        }
    }, [textAreaRef, thingsThatChange]);
};

export default useAutosizeTextArea;
