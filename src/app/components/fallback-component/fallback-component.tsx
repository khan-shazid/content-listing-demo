import { Loader } from 'app/components/loader/loader';

export function FallbackComponent() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-default">
            <Loader />
        </div>
    );
}
