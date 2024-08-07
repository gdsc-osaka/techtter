import { storage } from '@/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import useSWR from 'swr';

export default function useFetchFileUrl(path: string) {
    return useSWR<string, Error>(path, async () => {
        const pathRef = ref(storage, path);
        return getDownloadURL(pathRef);
    });
}
