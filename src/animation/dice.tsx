import React, { useState } from 'react';
import { useEffectListener } from 'bgio-effects/react';

export default function DiceComponent() {
    const [animate, setAnimate] = useState(false);

    // Subscribe to the “rollDie” effect type:
    useEffectListener(
        // Name of the effect to listen for.
        'rollDie',
        // Function to call when the effect fires.
        () => {
            setAnimate(true);
            const timeout = window.setTimeout(() => setAnimate(false), 1000);
            // Return a clean-up function to cancel the timeout.
            return () => window.clearTimeout(timeout);
        },
        // Dependency array of variables the callback uses.
        [setAnimate]
    );

    return <div className={animate ? 'w-10 h-10 bg-red-500' : 'w-10 h-10 bg-green-500'} />;
}