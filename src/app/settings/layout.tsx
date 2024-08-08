import Divider from '@/components/divider';
import { AccountCircleIcon } from '@/components/icons';
import { headers } from 'next/headers';
import Link from 'next/link';

const links: { link: string; icon: React.ReactNode; label: string }[] = [
    {
        link: '/settings/profile',
        icon: <AccountCircleIcon />,
        label: 'プロフィール',
    },
    // {
    //     link: '/settings/account',
    //     icon: <SettingsIcon />,
    //     label: 'アカウント',
    // },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const url = headers().get('x-url');
    const path = url !== null ? new URL(url).pathname : null;
    const link = links.find(({ link }) => path?.includes(link));

    return (
        <div className={'p-4 md:p-12 flex gap-4'}>
            <aside className={'flex flex-col w-64'}>
                {links.map(({ link, icon, label }) => {
                    const isSamePath = path?.includes(link);
                    return (
                        <Link
                            key={link}
                            href={link}
                            className={
                                'flex gap-2 px-4 py-2 rounded text-stone-500 hover:bg-stone-100 transition-colors ' +
                                (isSamePath
                                    ? 'bg-stone-100 text-stone-800'
                                    : '')
                            }
                        >
                            {icon}
                            <span
                                className={isSamePath ? 'text-stone-800' : ''}
                            >
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </aside>
            <main className={'w-full'}>
                {link && (
                    <>
                        <h1 className={'text-lg font-bold pb-2'}>
                            {link.label}
                        </h1>
                        <Divider />
                    </>
                )}
                {children}
            </main>
        </div>
    );
}
