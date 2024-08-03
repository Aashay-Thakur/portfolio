import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { SvgIcon } from '@mui/material';

const Error404 = () => {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		animate('path', { pathLength: 1 }, { duration: 1, delay: stagger(0.2) });
	}, []);

	return (
		<SvgIcon
			sx={{
				width: '100%',
				height: '100%',
				aspectRatio: '167.7 / 71.5',
				stroke: 'currentColor',
				fill: 'transparent',
			}}
			ref={scope}
			viewBox="0 0 167.7 71.5"
			xmlns="http://www.w3.org/2000/svg">
			<path
				pathLength={0}
				d="M 36.9 0.7 L 36.9 48.2 L 51.7 48.2 L 51.7 48.6 A 0.63 0.63 0 0 1 51.644 48.877 Q 51.488 49.2 50.9 49.2 L 36.9 49.2 L 36.9 70.8 L 35.7 70.8 L 35.7 49.2 L 1 49.2 A 3.785 3.785 0 0 1 0.794 49.195 Q 0.425 49.175 0.325 49.075 A 0.745 0.745 0 0 1 0.235 48.964 Q 0.194 48.904 0.157 48.829 A 1.762 1.762 0 0 1 0.1 48.7 L 0 48.3 L 36.2 0.7 L 36.9 0.7 Z M 35.7 48.2 L 35.7 4.7 L 35.7 3.85 Q 35.7 3.4 35.8 2.95 L 1.4 48.2 L 35.7 48.2 Z"
				id="0"
			/>
			<path
				pathLength={0}
				d="M 107.348 43.122 Q 106.987 46.658 106.255 49.73 A 40.117 40.117 0 0 1 105.725 51.725 A 41.476 41.476 0 0 1 103.729 57.165 Q 102.273 60.375 100.375 62.85 A 23.004 23.004 0 0 1 96.025 67.225 A 19.818 19.818 0 0 1 92.475 69.375 Q 87.95 71.5 82.9 71.5 Q 77.85 71.5 73.325 69.375 Q 68.8 67.25 65.425 62.85 A 28.317 28.317 0 0 1 62.4 57.869 Q 61.23 55.435 60.327 52.557 A 47.973 47.973 0 0 1 60.075 51.725 A 45.572 45.572 0 0 1 58.674 45 Q 58.243 41.82 58.136 38.235 A 81.158 81.158 0 0 1 58.1 35.8 A 72.168 72.168 0 0 1 58.452 28.478 Q 58.813 24.942 59.545 21.871 A 40.117 40.117 0 0 1 60.075 19.875 A 41.72 41.72 0 0 1 62.071 14.431 Q 63.345 11.616 64.957 9.359 A 25.17 25.17 0 0 1 65.425 8.725 A 23.223 23.223 0 0 1 69.712 4.369 A 19.939 19.939 0 0 1 73.325 2.15 Q 77.85 0 82.9 0 Q 87.95 0 92.475 2.15 Q 97 4.3 100.375 8.725 Q 103.539 12.874 105.473 19.044 A 48.159 48.159 0 0 1 105.725 19.875 A 45.572 45.572 0 0 1 107.126 26.601 Q 107.557 29.781 107.664 33.365 A 81.158 81.158 0 0 1 107.7 35.8 A 72.168 72.168 0 0 1 107.348 43.122 Z M 106.4 35.8 A 73.048 73.048 0 0 0 106.091 28.892 Q 105.638 24.139 104.525 20.25 A 41.112 41.112 0 0 0 102.65 14.998 Q 101.458 12.29 99.951 10.121 A 24.086 24.086 0 0 0 99.45 9.425 A 22.429 22.429 0 0 0 95.569 5.359 A 18.852 18.852 0 0 0 91.975 3.075 Q 87.7 1 82.9 1 Q 78.1 1 73.8 3.075 A 19.772 19.772 0 0 0 67.955 7.425 A 24.397 24.397 0 0 0 66.275 9.425 Q 63.05 13.7 61.175 20.25 A 45.209 45.209 0 0 0 59.861 26.689 Q 59.44 29.831 59.335 33.385 A 81.689 81.689 0 0 0 59.3 35.8 A 73.048 73.048 0 0 0 59.609 42.708 Q 60.062 47.461 61.175 51.35 A 40.455 40.455 0 0 0 63.036 56.554 Q 64.217 59.231 65.711 61.374 A 23.697 23.697 0 0 0 66.275 62.15 Q 69.5 66.4 73.8 68.45 Q 78.1 70.5 82.9 70.5 Q 87.7 70.5 91.975 68.45 A 19.487 19.487 0 0 0 97.783 64.138 A 24.076 24.076 0 0 0 99.45 62.15 Q 102.65 57.9 104.525 51.35 A 45.209 45.209 0 0 0 105.839 44.911 Q 106.26 41.769 106.365 38.215 A 81.689 81.689 0 0 0 106.4 35.8 Z"
				id="1"
			/>
			<path
				pathLength={0}
				d="M 152.9 0.7 L 152.9 48.2 L 167.7 48.2 L 167.7 48.6 A 0.63 0.63 0 0 1 167.644 48.877 Q 167.488 49.2 166.9 49.2 L 152.9 49.2 L 152.9 70.8 L 151.7 70.8 L 151.7 49.2 L 117 49.2 A 3.785 3.785 0 0 1 116.794 49.195 Q 116.425 49.175 116.325 49.075 A 0.745 0.745 0 0 1 116.235 48.964 Q 116.194 48.904 116.157 48.829 A 1.762 1.762 0 0 1 116.1 48.7 L 116 48.3 L 152.2 0.7 L 152.9 0.7 Z M 151.7 48.2 L 151.7 4.7 L 151.7 3.85 Q 151.7 3.4 151.8 2.95 L 117.4 48.2 L 151.7 48.2 Z"
				id="2"
			/>
		</SvgIcon>
	);
};

export default Error404;