import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const AnimatedLogo = (props: SvgIconProps) => {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		animate('path', { pathLength: 1 }, { duration: 0.5, delay: stagger(0.2, { startDelay: 0.2 }) });
	}, [animate]);

	return (
		<SvgIcon
			ref={scope}
			fill="currentColor"
			stroke="currentColor"
			viewBox="0 0 350 350"
			{...props}
			style={{ width: '100%', height: '100%' }}
			xmlns="http://www.w3.org/2000/svg">
			<path pathLength={0} d="M40 290L159 74" strokeWidth="5" strokeLinecap="round" />
			<path pathLength={0} d="M161 71L161 280" strokeWidth="10" strokeLinecap="round" />
			<path pathLength={0} d="M173 69L309 69" strokeWidth="5" strokeLinecap="round" />
			<path
				pathLength={0}
				d="M240 76L240 71L230 71L230 76L240 76ZM230 285C230 287.761 232.239 290 235 290C237.761 290 240 287.761 240 285L230 285ZM230 76L230 285L240 285L240 76L230 76Z"
			/>
			<path
				pathLength={0}
				d="M72.0003 170.479C70.6196 170.479 69.5002 171.598 69.5 172.979C69.4999 174.36 70.6191 175.479 71.9998 175.479L72.0003 170.479ZM276.768 174.768C277.744 173.792 277.744 172.209 276.768 171.232L260.86 155.321C259.883 154.344 258.301 154.344 257.324 155.321C256.348 156.297 256.348 157.88 257.324 158.856L271.464 173L257.321 187.14C256.344 188.117 256.344 189.699 257.321 190.676C258.297 191.652 259.88 191.652 260.856 190.676L276.768 174.768ZM71.9998 175.479L275 175.5L275 170.5L72.0003 170.479L71.9998 175.479Z"
			/>
		</SvgIcon>
	);
};

export default AnimatedLogo;
