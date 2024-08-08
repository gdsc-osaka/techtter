import { SentimentStressedIcon } from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Fragment } from 'react';

interface Props {
    fileUrls: {
        isLoading: boolean;
        data?: string;
        error?: Error;
    }[];
}

export default function FileList({ fileUrls }: Props) {
    if (fileUrls.length === 0) {
        return null;
    }

    return (
        <div className={'flex gap-1 h-28 mt-1'}>
            {fileUrls.map(({ isLoading, data, error }, index) => (
                <Fragment key={`${data}-file-${index}`}>
                    {isLoading && (
                        <Skeleton
                            className={'aspect-square flex-none rounded'}
                        />
                    )}
                    {data !== undefined && (
                        <img
                            src={data}
                            alt={`${data}-file-${index}`}
                            className={
                                'aspect-square max-w-28 object-cover rounded'
                            }
                            loading={'lazy'}
                        />
                    )}
                    {error && (
                        <div
                            className={
                                'w-28 h-28 rounded border border-primary text-primary ' +
                                'flex justify-center items-center'
                            }
                        >
                            <SentimentStressedIcon size={48} />
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}
