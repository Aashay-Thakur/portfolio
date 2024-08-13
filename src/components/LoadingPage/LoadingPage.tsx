import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { Box, SvgIcon } from '@mui/material';

interface LoadingPageProps {
	onComplete?: () => void;
}

const LoadingPage = ({ onComplete }: LoadingPageProps) => {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		const animation = animate('path', { pathLength: 1 }, { duration: 1, delay: stagger(0.1) });
		animation.then(() => onComplete && onComplete());
	}, []);

	return (
		<Box
			sx={{
				position: 'fixed',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				background: 'background.default',
				color: 'text.primary',
			}}>
			<SvgIcon
				ref={scope}
				sx={{
					position: 'fixed',
					width: '100%',
					transform: 'scale(2)',
					aspectRatio: '312.7 / 90.8',
					stroke: 'currentColor',
					fill: 'transparent',
				}}
				viewBox="0 0 312.7 90.8"
				xmlns="http://www.w3.org/2000/svg">
				<path
					pathLength={0}
					d="M 1.2 2 L 1.2 70.9 L 36.9 70.9 L 36.9 72 L 0 72 L 0 2 L 1.2 2 Z"
					id="0"
					vectorEffect="non-scaling-vector"
				/>
				<path
					pathLength={0}
					d="M 68.662 22.656 A 19.461 19.461 0 0 1 72.95 24.025 Q 76.95 25.85 79.675 29.15 A 21.123 21.123 0 0 1 82.796 34.337 A 26.262 26.262 0 0 1 83.8 37.125 Q 85.2 41.8 85.2 47.5 A 40.093 40.093 0 0 1 84.805 53.253 A 31.238 31.238 0 0 1 83.8 57.825 Q 82.4 62.45 79.675 65.75 Q 76.95 69.05 72.95 70.825 A 20.387 20.387 0 0 1 67.501 72.35 A 26.488 26.488 0 0 1 63.8 72.6 A 25.877 25.877 0 0 1 59.05 72.184 A 19.656 19.656 0 0 1 54.625 70.825 Q 50.65 69.05 47.925 65.75 Q 45.2 62.45 43.8 57.825 A 32.162 32.162 0 0 1 42.631 51.954 A 41.464 41.464 0 0 1 42.4 47.5 A 40.231 40.231 0 0 1 42.819 41.572 A 31.839 31.839 0 0 1 43.8 37.125 Q 45.2 32.45 47.925 29.15 Q 50.65 25.85 54.625 24.025 A 19.674 19.674 0 0 1 59.924 22.478 A 25.952 25.952 0 0 1 63.8 22.2 A 24.833 24.833 0 0 1 68.662 22.656 Z M 63.8 71.6 A 24.323 24.323 0 0 0 68.224 71.215 A 18.424 18.424 0 0 0 72.6 69.85 Q 76.4 68.1 78.925 64.95 A 20.045 20.045 0 0 0 81.78 60.067 A 25.106 25.106 0 0 0 82.725 57.35 Q 84 52.9 84 47.5 A 39.764 39.764 0 0 0 83.597 41.718 A 31.798 31.798 0 0 0 82.725 37.625 A 24.073 24.073 0 0 0 80.895 32.994 A 19.754 19.754 0 0 0 78.925 29.95 Q 76.4 26.75 72.6 24.975 A 18.566 18.566 0 0 0 67.523 23.471 A 24.608 24.608 0 0 0 63.8 23.2 A 24.272 24.272 0 0 0 59.381 23.584 A 18.012 18.012 0 0 0 54.975 24.975 Q 51.2 26.75 48.675 29.95 A 20.597 20.597 0 0 0 45.794 34.953 A 25.623 25.623 0 0 0 44.875 37.625 A 33.071 33.071 0 0 0 43.779 43.58 A 41.617 41.617 0 0 0 43.6 47.5 A 39.678 39.678 0 0 0 43.992 53.198 A 31.47 31.47 0 0 0 44.875 57.35 A 23.68 23.68 0 0 0 46.643 61.828 A 19.272 19.272 0 0 0 48.675 64.95 Q 51.2 68.1 54.975 69.85 Q 58.75 71.6 63.8 71.6 Z"
					id="1"
					vectorEffect="non-scaling-vector"
				/>
				<path
					pathLength={0}
					d="M 129.6 72 L 129.4 72 Q 128.7 72 128.7 71.2 L 128.4 63.25 A 56.53 56.53 0 0 1 125.381 66.193 A 48.595 48.595 0 0 1 124.2 67.225 Q 122.1 69 119.75 70.225 Q 117.4 71.45 114.7 72.125 A 22.132 22.132 0 0 1 111.473 72.671 A 28.667 28.667 0 0 1 108.7 72.8 A 15.134 15.134 0 0 1 104.414 72.167 A 16.855 16.855 0 0 1 104.275 72.125 Q 102.05 71.45 100.25 69.975 A 10.644 10.644 0 0 1 97.849 67.152 A 12.884 12.884 0 0 1 97.325 66.175 Q 96.306 64.068 96.21 61.12 A 19.111 19.111 0 0 1 96.2 60.5 Q 96.2 57.2 98.125 54.575 Q 100.05 51.95 104.025 50.1 Q 108 48.25 114.05 47.175 Q 119.116 46.275 125.76 45.988 A 138.905 138.905 0 0 1 128.4 45.9 L 128.4 39.6 A 29.896 29.896 0 0 0 128.189 35.963 A 22.233 22.233 0 0 0 127.55 32.7 Q 126.7 29.65 125.05 27.55 Q 123.4 25.45 120.9 24.325 A 12.502 12.502 0 0 0 117.672 23.389 A 16.764 16.764 0 0 0 115.1 23.2 Q 112.5 23.2 110.4 23.75 A 23.012 23.012 0 0 0 108.238 24.426 A 17.85 17.85 0 0 0 106.65 25.1 A 18.223 18.223 0 0 0 104.972 26.02 A 14.152 14.152 0 0 0 103.775 26.85 A 51.21 51.21 0 0 0 102.765 27.653 Q 102.309 28.026 101.91 28.372 A 29.645 29.645 0 0 0 101.65 28.6 Q 100.795 29.36 100.256 29.895 A 17.793 17.793 0 0 0 100.2 29.95 Q 99.726 30.424 99.475 30.49 A 0.298 0.298 0 0 1 99.4 30.5 A 0.36 0.36 0 0 1 99.265 30.471 Q 99.15 30.424 99.009 30.302 A 2.098 2.098 0 0 1 98.9 30.2 L 98.7 30 A 33.02 33.02 0 0 1 102.304 26.695 A 24.797 24.797 0 0 1 106.15 24.2 A 17.563 17.563 0 0 1 111.669 22.447 A 22.992 22.992 0 0 1 115.1 22.2 A 19.686 19.686 0 0 1 118.159 22.426 Q 120.032 22.72 121.575 23.4 Q 124.3 24.6 126.1 26.85 A 13.523 13.523 0 0 1 128.053 30.223 A 17.182 17.182 0 0 1 128.75 32.325 A 24.934 24.934 0 0 1 129.413 35.984 A 33.465 33.465 0 0 1 129.6 39.6 L 129.6 72 Z M 128.4 62 L 128.4 46.9 Q 115.082 47.323 107.574 49.837 A 27.655 27.655 0 0 0 105.025 50.825 Q 97.4 54.25 97.4 60.5 A 14.962 14.962 0 0 0 97.58 62.883 Q 97.819 64.363 98.375 65.575 A 11.01 11.01 0 0 0 99.743 67.832 A 9.36 9.36 0 0 0 100.925 69.075 Q 102.5 70.45 104.525 71.125 Q 106.55 71.8 108.7 71.8 A 25.684 25.684 0 0 0 112.182 71.574 A 19.883 19.883 0 0 0 114.95 71 A 23.41 23.41 0 0 0 119.203 69.337 A 21.229 21.229 0 0 0 120.1 68.85 Q 122.45 67.5 124.475 65.725 Q 126.5 63.95 128.4 62 Z"
					id="2"
					vectorEffect="non-scaling-vector"
				/>
				<path
					pathLength={0}
					d="M 181.1 72 L 180.8 72 Q 180.1 72 180.1 71.2 L 179.9 61.75 A 27.304 27.304 0 0 1 174.779 67.588 A 24.528 24.528 0 0 1 171.925 69.675 Q 167.25 72.6 161.7 72.6 A 23.705 23.705 0 0 1 155.732 71.893 A 16.037 16.037 0 0 1 147.125 66.475 A 18.946 18.946 0 0 1 143.966 60.679 Q 142.128 55.45 142.1 47.835 A 64.228 64.228 0 0 1 142.1 47.6 A 36.931 36.931 0 0 1 142.797 40.317 A 32.524 32.524 0 0 1 143.45 37.65 A 24.947 24.947 0 0 1 145.665 32.316 A 21.485 21.485 0 0 1 147.5 29.575 Q 150.2 26.15 154.225 24.175 A 18.965 18.965 0 0 1 159.622 22.501 A 25.221 25.221 0 0 1 163.6 22.2 A 23.013 23.013 0 0 1 168.366 22.672 A 17.773 17.773 0 0 1 173.05 24.35 A 16.891 16.891 0 0 1 178.028 28.417 A 21.812 21.812 0 0 1 179.9 31 L 179.9 0 L 181.1 0 L 181.1 72 Z M 179.9 60.15 L 179.9 32.6 Q 177.357 28.57 174.385 26.393 A 14.369 14.369 0 0 0 172.7 25.325 A 17.743 17.743 0 0 0 166.552 23.387 A 22.615 22.615 0 0 0 163.6 23.2 A 23.849 23.849 0 0 0 159.21 23.585 A 17.55 17.55 0 0 0 154.65 25.075 Q 150.85 26.95 148.325 30.25 A 21.79 21.79 0 0 0 145.255 35.847 A 26.172 26.172 0 0 0 144.55 38 A 33.779 33.779 0 0 0 143.399 44.758 A 40.131 40.131 0 0 0 143.3 47.6 Q 143.3 59.8 147.975 65.7 Q 152.65 71.6 161.7 71.6 Q 167.15 71.6 171.825 68.55 A 25.791 25.791 0 0 0 177.828 63.051 A 32.047 32.047 0 0 0 179.9 60.15 Z"
					id="3"
					vectorEffect="non-scaling-vector"
				/>
				<path
					pathLength={0}
					d="M 201.1 23 L 202.3 23 L 202.3 72 L 201.1 72 L 201.1 23 Z M 203.944 6.331 A 3.368 3.368 0 0 1 203.625 6.675 A 3.283 3.283 0 0 1 202.885 7.209 A 2.543 2.543 0 0 1 201.7 7.5 Q 200.55 7.5 199.725 6.675 A 2.993 2.993 0 0 1 199.176 5.939 A 2.439 2.439 0 0 1 198.9 4.8 Q 198.9 3.65 199.725 2.825 A 2.755 2.755 0 0 1 200.835 2.131 A 2.804 2.804 0 0 1 201.7 2 Q 202.75 2 203.625 2.825 A 2.827 2.827 0 0 1 204.264 3.693 A 2.601 2.601 0 0 1 204.5 4.8 A 2.392 2.392 0 0 1 203.944 6.331 Z"
					id="4"
					vectorEffect="non-scaling-vector"
				/>
				<path
					pathLength={0}
					d="M 222.8 72 L 221.6 72 L 221.6 23 L 221.9 23 Q 222.6 23 222.6 23.8 L 222.75 33.25 Q 224.45 30.75 226.575 28.7 Q 228.7 26.65 231.15 25.2 Q 233.6 23.75 236.3 22.975 Q 239 22.2 241.9 22.2 Q 250.05 22.2 254.075 27.05 A 16.176 16.176 0 0 1 257.078 32.81 Q 258.1 36.216 258.1 40.6 L 258.1 72 L 256.9 72 L 256.9 40.6 A 32.015 32.015 0 0 0 256.689 36.833 A 23.551 23.551 0 0 0 256 33.275 A 16.031 16.031 0 0 0 254.724 30.039 A 13.107 13.107 0 0 0 253.225 27.8 Q 251.35 25.55 248.525 24.375 A 14.751 14.751 0 0 0 245.248 23.458 Q 243.779 23.216 242.122 23.201 A 24.306 24.306 0 0 0 241.9 23.2 Q 236.15 23.2 231.3 26.275 Q 226.45 29.35 222.8 34.75 L 222.8 72 Z"
					id="5"
					vectorEffect="non-scaling-vector"
				/>
				<path
					pathLength={0}
					d="M 300.8 25.4 L 312.7 25.4 L 312.7 25.6 A 0.604 0.604 0 0 1 312.502 26.055 A 0.819 0.819 0 0 1 312.45 26.1 A 0.917 0.917 0 0 1 312.162 26.259 A 0.837 0.837 0 0 1 311.9 26.3 L 302.1 26.5 Q 304.35 28.6 305.525 31.45 A 15.587 15.587 0 0 1 306.596 35.779 A 19.259 19.259 0 0 1 306.7 37.8 A 18.063 18.063 0 0 1 306.291 41.711 A 15.156 15.156 0 0 1 305.525 44.175 Q 304.35 47.05 302.175 49.1 A 14.839 14.839 0 0 1 297.882 51.901 A 17.435 17.435 0 0 1 296.95 52.275 A 18.026 18.026 0 0 1 292.845 53.242 A 23.053 23.053 0 0 1 290.1 53.4 A 22.066 22.066 0 0 1 285.77 52.994 A 16.914 16.914 0 0 1 281.5 51.55 Q 280.25 52.25 279.2 53.15 A 12.568 12.568 0 0 0 277.898 54.435 A 10.838 10.838 0 0 0 277.4 55.05 A 9.569 9.569 0 0 0 276.522 56.449 A 8.3 8.3 0 0 0 276.225 57.1 A 6.142 6.142 0 0 0 275.908 58.117 A 4.689 4.689 0 0 0 275.8 59.1 A 6.438 6.438 0 0 0 275.975 60.647 A 4.256 4.256 0 0 0 277.35 62.925 Q 278.9 64.25 281.45 64.9 A 25.686 25.686 0 0 0 284.175 65.431 Q 285.58 65.631 287.149 65.719 A 41.167 41.167 0 0 0 287.25 65.725 Q 290.5 65.9 293.9 66.05 Q 297.3 66.2 300.55 66.55 A 24.881 24.881 0 0 1 303.625 67.069 A 19.131 19.131 0 0 1 306.35 67.925 A 11.104 11.104 0 0 1 308.777 69.254 A 9.225 9.225 0 0 1 310.45 70.825 A 6.402 6.402 0 0 1 311.679 73.262 Q 311.935 74.204 311.987 75.32 A 12.479 12.479 0 0 1 312 75.9 Q 312 78.85 310.475 81.525 A 14.813 14.813 0 0 1 307.637 85.06 A 18.131 18.131 0 0 1 306.175 86.275 A 19.881 19.881 0 0 1 302.474 88.439 A 25.935 25.935 0 0 1 299.475 89.575 A 26.57 26.57 0 0 1 294.488 90.598 A 34.272 34.272 0 0 1 290.7 90.8 Q 285.75 90.8 281.95 89.75 Q 278.28 88.736 275.729 87.022 A 15.527 15.527 0 0 1 275.55 86.9 A 13.994 13.994 0 0 1 273.208 84.884 A 11.239 11.239 0 0 1 271.625 82.7 Q 270.3 80.3 270.3 77.6 Q 270.3 73.4 273.15 70.375 A 16.183 16.183 0 0 1 276.989 67.407 Q 278.721 66.426 280.833 65.706 A 26.785 26.785 0 0 1 280.85 65.7 A 12.918 12.918 0 0 1 278.761 64.995 Q 277.59 64.478 276.7 63.754 A 7.645 7.645 0 0 1 276.375 63.475 A 4.927 4.927 0 0 1 274.916 60.977 Q 274.7 60.124 274.7 59.1 Q 274.7 58.1 275.125 57 A 9.837 9.837 0 0 1 275.904 55.432 A 11.614 11.614 0 0 1 276.3 54.825 Q 277.05 53.75 278.125 52.775 Q 279.2 51.8 280.55 51.05 Q 277.15 49.05 275.325 45.65 A 15.259 15.259 0 0 1 273.678 40.479 A 19.535 19.535 0 0 1 273.5 37.8 A 18.016 18.016 0 0 1 273.944 33.736 A 15.423 15.423 0 0 1 274.65 31.475 Q 275.8 28.6 277.975 26.55 A 15.105 15.105 0 0 1 282.177 23.772 A 17.771 17.771 0 0 1 283.2 23.35 A 17.577 17.577 0 0 1 287.104 22.39 A 22.802 22.802 0 0 1 290.1 22.2 A 21.545 21.545 0 0 1 293.569 22.468 A 17.289 17.289 0 0 1 296.025 23.05 A 17.599 17.599 0 0 1 299.644 24.649 A 15.701 15.701 0 0 1 300.8 25.4 Z M 310.9 75.9 A 9.25 9.25 0 0 0 310.723 74.037 Q 310.407 72.5 309.525 71.425 A 8.448 8.448 0 0 0 307.087 69.414 A 10.738 10.738 0 0 0 305.85 68.825 A 18.238 18.238 0 0 0 303.057 67.966 A 24.018 24.018 0 0 0 300.6 67.55 A 94.632 94.632 0 0 0 296.034 67.123 A 106.008 106.008 0 0 0 294.45 67.025 Q 291.25 66.85 288.1 66.7 Q 284.95 66.55 282.3 66.05 Q 279.95 66.9 277.95 68 A 15.69 15.69 0 0 0 275.675 69.512 A 13.235 13.235 0 0 0 274.525 70.55 A 11.232 11.232 0 0 0 272.402 73.532 A 10.679 10.679 0 0 0 272.3 73.75 A 8.936 8.936 0 0 0 271.522 76.92 A 10.597 10.597 0 0 0 271.5 77.6 Q 271.5 80.15 272.85 82.375 A 11.671 11.671 0 0 0 275.238 85.163 A 14.629 14.629 0 0 0 276.675 86.25 A 17.431 17.431 0 0 0 279.608 87.806 A 24.073 24.073 0 0 0 282.7 88.85 A 27.197 27.197 0 0 0 286.852 89.605 A 36.364 36.364 0 0 0 290.7 89.8 Q 294.65 89.8 298.3 88.775 A 25.156 25.156 0 0 0 302.335 87.276 A 20.864 20.864 0 0 0 304.75 85.925 Q 307.55 84.1 309.225 81.55 Q 310.9 79 310.9 75.9 Z M 290.1 52.4 A 21.688 21.688 0 0 0 293.499 52.146 A 16.375 16.375 0 0 0 296.6 51.35 A 14.295 14.295 0 0 0 299.821 49.696 A 12.487 12.487 0 0 0 301.425 48.375 Q 303.4 46.45 304.45 43.75 Q 305.5 41.05 305.5 37.8 A 17.095 17.095 0 0 0 305.101 34.043 A 14.535 14.535 0 0 0 304.425 31.85 Q 303.35 29.15 301.35 27.225 A 13.37 13.37 0 0 0 297.539 24.675 A 15.835 15.835 0 0 0 296.5 24.25 A 16.86 16.86 0 0 0 292.664 23.348 A 21.559 21.559 0 0 0 290.1 23.2 A 20.665 20.665 0 0 0 286.526 23.496 A 16.316 16.316 0 0 0 283.7 24.25 A 14.432 14.432 0 0 0 280.325 26.005 A 12.773 12.773 0 0 0 278.85 27.225 Q 276.85 29.15 275.775 31.85 A 15.252 15.252 0 0 0 274.771 36.161 A 18.453 18.453 0 0 0 274.7 37.8 A 17.095 17.095 0 0 0 275.099 41.557 A 14.535 14.535 0 0 0 275.775 43.75 Q 276.85 46.45 278.85 48.375 A 13.37 13.37 0 0 0 282.661 50.925 A 15.835 15.835 0 0 0 283.7 51.35 A 16.86 16.86 0 0 0 287.536 52.252 A 21.559 21.559 0 0 0 290.1 52.4 Z"
					id="6"
					vectorEffect="non-scaling-vector"
				/>
			</SvgIcon>
		</Box>
	);
};

export { LoadingPage };
