'use server';

export async function createPost(formData: FormData) {
    const content = formData.get('content');

    if (typeof content !== 'string') {
        return Promise.reject(new Error('Invalid content'));
    }

    console.log(content);
}
