import { m } from 'framer-motion';

interface ExternalLinkProps {
	active: boolean;
}

const ExternalLink = ({ active }: ExternalLinkProps) => {
	return (
		<svg
			className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
			focusable="false"
			aria-hidden="true"
			viewBox="0 0 24 24"
			data-testid="OpenInNewSharpIcon">
			<path d="M 19 19 H 5 V 5 h 7 V 3 H 3 v 18 h 18 v -9 h -2 Z"></path>
			<m.path
				initial={false}
				animate={active ? { x: 2, y: -2 } : { x: 0, y: 0 }}
				d="M 14 3 v 2 h 3.59 l -9.83 9.83 l 1.41 1.41 L 19 6.41 V 10 h 2 V 3 Z"></m.path>
		</svg>
	);
};

export { ExternalLink };
