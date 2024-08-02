import { Box } from '@mui/material';

import { MotionArrow } from './MotionArrow';

const ToAndFro = ({ arrowTip, still }: { arrowTip?: boolean; still?: boolean }) => {
	return (
		<Box
			sx={{
				position: 'relative',
				height: '100%',
				width: '100%',
			}}>
			<Box
				sx={{
					position: 'absolute',
					height: '100%',
					width: '100%',
					transform: 'translateY(10px)',
				}}>
				<MotionArrow arrowTip={!still && arrowTip} still={still} />
			</Box>
			<Box
				sx={{
					position: 'absolute',
					height: '100%',
					width: '100%',
					transform: 'translateY(-10px)',
				}}>
				<MotionArrow rotation={180} arrowTip={!still && arrowTip} still={still} />
			</Box>
		</Box>
	);
};

export { ToAndFro };
