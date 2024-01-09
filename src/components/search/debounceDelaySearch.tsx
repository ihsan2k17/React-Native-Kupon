import { useState } from "react";

export const debounce = (
    callback: (...args: any[]) => void,
    alwaysCall: (...args: any[]) => void,
    ms: number
) => {
    const [timeoutToClear, setTimeoutToClear] = useState<number|null>(null)
    return (...args: any[]) => {
        alwaysCall(...args);

        if (timeoutToClear) {
            clearTimeout(timeoutToClear);
        }

        setTimeoutToClear(
            setTimeout(() => {
                callback(...args);
            }, ms)
        );
    };
};