import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
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
                // components={{
                //     pre: CodeBlock,
                // }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
