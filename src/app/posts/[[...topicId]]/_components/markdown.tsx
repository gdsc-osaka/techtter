import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.css';

interface Props {
    children: string;
}

export default function Markdown({ children }: Props) {
    return (
        <div className={'markdown-body'}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {children}
            </ReactMarkdown>
        </div>
    );
}
