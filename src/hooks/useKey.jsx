import { useEffect } from "react";

export function useKey(key, callback) {
    useEffect(function() {
        function onEscClose(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                callback();
            }
        }

        document.addEventListener('keydown', onEscClose);

        return function() {
            document.removeEventListener('keydown', onEscClose);
        }
    }, [callback, key]);
}