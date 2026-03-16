'use client';

import { Suspense } from 'react';
import ClientModeIntro from '@/components/ClientModeIntro';

function ClientIntroWrapper({ onComplete }: { onComplete: () => void }) {
    return (
        <Suspense fallback={null}>
            <ClientModeIntro onComplete={onComplete} />
        </Suspense>
    );
}

export default ClientIntroWrapper;
