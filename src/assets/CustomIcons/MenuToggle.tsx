import { m, SVGMotionProps } from 'framer-motion';
import { SVGProps } from 'react';

const Path = (props: SVGMotionProps<SVGPathElement>) => (
	<m.path fill="transparent" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...props} />
);

interface MenuIconProps {
	open: boolean;
	pathProps?: SVGMotionProps<SVGPathElement>;
	svgProps?: SVGProps<SVGSVGElement>;
}

const MenuIcon = ({ open, pathProps, svgProps }: MenuIconProps) => {
	const defaultPathProps = {
		initial: 'closed',
		animate: open ? 'open' : 'closed',
		transition: {
			duration: 0.3,
		},
		...pathProps,
	};

	return (
		<svg width="23" height="18" viewBox="0 0 23 18" {...svgProps}>
			<Path
				d="M 2 2.5 L 20 2.5"
				className="top"
				variants={{
					closed: { d: 'M 2 2.5 L 20 2.5' },
					open: { d: 'M 3 16.5 L 17 2.5' },
				}}
				{...defaultPathProps}
			/>
			<Path
				d="M 2 9.423 L 20 9.423"
				className="middle"
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
				{...defaultPathProps}
			/>
			<Path
				d="M 2 16.346 L 20 16.346"
				className="bottom"
				variants={{
					closed: { d: 'M 2 16.346 L 20 16.346' },
					open: { d: 'M 3 2.5 L 17 16.346' },
				}}
				{...defaultPathProps}
			/>
		</svg>
	);
};

export { MenuIcon };
