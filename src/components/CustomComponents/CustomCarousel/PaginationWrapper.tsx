import { ReactNode } from 'react';

import { Pagination, PaginationProps, Stack } from '@mui/material';

interface PaginationWrapperProps extends PaginationProps {
	children: ReactNode;
	pagination: boolean;
	position: 'top' | 'bottom';
}

const PaginationWrapper = ({ children, pagination, position, ...paginationProps }: PaginationWrapperProps) => {
	if (pagination) {
		return (
			<Stack
				spacing={2}
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: position === 'top' ? 'column-reverse' : 'column',
				}}
				useFlexGap>
				{children}
				<Pagination {...paginationProps} />
			</Stack>
		);
	} else {
		return children;
	}
};

export { PaginationWrapper };
