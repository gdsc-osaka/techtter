import { ChangeEvent } from 'react';

export interface FileInfo {
    file: File;
    previewUrl: string;
}

export function getFileData(event: ChangeEvent<HTMLInputElement>): FileInfo[] {
    const files = event.target.files;
    if (files === null) return [];

    return Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
    }));
}
