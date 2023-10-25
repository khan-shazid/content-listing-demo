import { Loader } from 'app/components/loader/loader';
import { ReactNode } from 'react';

export function FallbackComponent(): ReactNode {
    return (
        <div className="w-full h-full flex items-center justify-center bg-default">
            <Loader />
        </div>
    );
}
