import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsonLang from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import urlBuilder from '@sanity/image-url'
import { projectId, dataset } from '~/utils/content.server'

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', jsonLang);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);

type CodeBlock = { language: string; content: string }
type Image = { 
  alt: string
  asset: { _ref: string },
  caption: string
}

const urlFor = (source: Image['asset']) => urlBuilder({ projectId, dataset }).image(source).toString()

const serializer = {
  types: {
    code: ({
      node: { language, content },
    }: { node: CodeBlock }) => (
      <SyntaxHighlighter language={language} style={a11yDark}>
        {content}
      </SyntaxHighlighter>
    ),
    image: ({ node: { alt, asset, caption }}: { node: Image }) => (
      <figure>
        <img src={urlFor(asset)} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    )
  },
};

export default serializer;
