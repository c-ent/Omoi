'use client'
import { useRouter } from 'next/navigation'

async function RefreshBtn () {
    const router = useRouter();

      const handleBtn = async (e) => {
        router.refresh();
        }

    return (
        <button onClick={handleBtn}>
            Refresh
        </button>
    );
};

export default RefreshBtn;