import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Link, Typography } from '@mui/material';

interface MarkdownRendererProps {
	markdown: string;
}

const components = {
	h1: ({ node, ...props }: any) => <Typography variant="h4" {...props} />,
	a: ({ node, ...props }: any) => <Link {...props} />,
	p: ({ node, ...props }: any) => <Typography variant="body1" component="span" {...props} />,
	strong: ({ node, ...props }: any) => (
		<Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }} {...props} />
	),
	em: ({ node, ...props }: any) => (
		<Typography component="span" variant="body1" sx={{ fontStyle: 'italic' }} {...props} />
	),
	code: ({ node, inline, className, children, ...props }: any) => (
		<Typography
			component="code"
			sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '0.2em 0.4em', borderRadius: '4px' }}
			{...props}>
			{children}
		</Typography>
	),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
	return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};

export { MarkdownRenderer };
