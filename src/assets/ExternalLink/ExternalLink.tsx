import { ArrowUpwardSharp, SquareOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

const ExternalLink = ({ active, size = 1 }: { active: boolean; size?: number }) => {
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'block',
				height: `${size}em`,
				width: `${size}em`,
			}}>
			<SquareOutlined
				sx={{
					position: 'absolute',
					height: '100%',
					width: '100%',
					left: 0,
					top: 0,
					color: 'inherit',
					clipPath: 'polygon(0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%)',
				}}
			/>
			<ArrowUpwardSharp
				className={active ? 'active' : ''}
				sx={{
					'position': 'absolute',
					'transform': 'rotate(45deg)',
					'height': '75%',
					'width': '75%',
					'right': '-16.5%',
					'top': '-16.5%',
					'color': 'inherit',
					'transition': 'transform 0.15s ease-in',
					'&.active': {
						transform: 'translate(12.5%, -12.5%) rotate(45deg)',
					},
				}}
			/>
		</Box>
	);
};

export { ExternalLink };
