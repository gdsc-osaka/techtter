import { Button } from '@/components/ui/button';

export default function Header() {
    return (
        <header
            className={
                'flex justify-between items-center px-4 py-1 border-b border-stone-300'
            }
        >
            <div></div>
            <div className={'flex gap-2'}>
                <Button variant={'secondary'} size={'sm'}>
                    ログイン
                </Button>
                <Button variant={'outline'} size={'sm'}>
                    登録
                </Button>
            </div>
        </header>
    );
}
