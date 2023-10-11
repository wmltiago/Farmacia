import { useCallback, useRef } from "react";


/**
 * impede varias consultas ao digitar no campo de buscar
 */

export const useDebounce = (delay = 400, notDelayInFirstTime = true) => {
    const debouncing = useRef<NodeJS.Timeout>();
    const isFirstTime = useRef(true);

    const debounce = useCallback((func: () => void) => {
        if (isFirstTime.current) {
            isFirstTime.current = (notDelayInFirstTime);
            func();

        } else {
            if (debouncing.current) {
                clearTimeout(debouncing.current);
            }
            debouncing.current = setTimeout(() => func(), delay);
        }

    }, [delay]);

    return { debounce };
}