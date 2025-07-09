// AppWrapper.tsx
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: flash.success,
                showConfirmButton: false,
                timer: 3000,
            });
        }

        if (flash?.error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: flash.error,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }, [flash]);

    return <>{children}</>;
}
