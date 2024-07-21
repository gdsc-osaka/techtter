import { redirect } from 'next/navigation';

export default function Page() {
    redirect('/posts');
    return (
        <main className="flex min-h-screen p-24">
            <h1>Techtter</h1>
            <h2>知見をシェアするプラットフォーム</h2>
        </main>
    );
}
