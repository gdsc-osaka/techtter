'use client';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons';
import { signInWithGoogle } from '@/infrastructure/auth/auth';

export function GoogleSignInButton() {
    function handleSignupWithGoogle() {
        signInWithGoogle();
    }

    return (
        <Button variant={'outline'} onClick={handleSignupWithGoogle}>
            <GoogleIcon />
            <span className={'ml-3'}>Signup with Google</span>
        </Button>
    );
}
