import React, { useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

const useBlockNavigation = (blocker) => {
    const { navigator } = React.useContext(NavigationContext);

    useEffect(() => {
        if (!blocker) return;

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker]);
};

export { useBlockNavigation };