import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './markdown.css';

interface Props {
    children: string;
}

export default function Markdown({ children }: Props) {
    return (
        <div className={'markdown-body'}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
