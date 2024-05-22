import { CodeBlock } from 'react-code-block';
import { useCopyToClipboard } from 'react-use';

export default function CodeBox({ code }: { code: string }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };

  return (
    <CodeBlock code={code} language={'JavaScript'}>
      <div className="relative">
        <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg" as="p">
          <CodeBlock.LineContent>
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold dark:text-gray-900 "
          onClick={copyCode}
        >
          {state.value ? 'Copied!' : 'Copy code'}
        </button>
      </div>
    </CodeBlock>
  );
}
