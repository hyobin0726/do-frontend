import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

function SessionChecker() {

    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            console.log(session.expires)
            const expires = new Date(session.expires);
            const now = new Date();

            if (now > expires) {
                console.log('SessionChecker')
                signOut();
            }
        }
    }, [session]);

    return null;
}

export default SessionChecker
