import { codeToHtml } from 'shiki'
import { useEffect, useMemo, useState} from "react";

interface CodeNode {
    props: {
        children: string,
        className: string,
    }
}

function assertCode(code: unknown): code is CodeNode {
    if (typeof code !== 'object' || !code) return false;
    if (!('props' in code)) return false;
    const props = code.props;
    if (typeof props !== 'object' || !props) return false;
    if (!('className' in props)) return false;
    const className = props.className;

    return typeof className === "string";
}

export default function CodeBlock({children, ...props}: JSX.IntrinsicElements['pre']) {
    if (!assertCode(children)) {
        return (
            <pre {...props}>
                {children}
            </pre>
        )
    }

    const lang = useMemo(() => {
        const match = /language-(\w+)/.exec(children.props.className);
        return match === null ? undefined : match[1].toLowerCase();
    }, [children]);

    if (lang === undefined) {
        return (
            <pre {...props}>
                {children}
            </pre>
        );
    }

    const [html, setHtml] = useState("<code></code>");

    useEffect(() => {
        codeToHtml(children.props.children, {
            lang: lang,
            theme: 'github-light'

        }).then((html) => {
            setHtml(html);
        });
    }, [children, lang]);

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}
