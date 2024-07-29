import { ReactNode } from 'react';

import { ArrowBackIosNewSharp, ArrowForwardIosSharp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

interface SideArrowsWrapperProps {
	children: ReactNode;
	sideArrows: boolean;
	onGoBack: () => void;
	onGoNext: () => void;
}

const SideArrowsWrapper = ({ children, sideArrows, onGoBack, onGoNext }: SideArrowsWrapperProps) => {
	if (sideArrows) {
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}>
			<IconButton onClick={onGoBack}>
				<ArrowBackIosNewSharp />
			</IconButton>
			{children}
			<IconButton onClick={onGoNext}>
				<ArrowForwardIosSharp />
			</IconButton>
		</Box>;
	} else {
		return children;
	}
};

export { SideArrowsWrapper };
