import { ReactNode, useState } from 'react';

import { CustomIcon } from '@barrel';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface ExpandMoreProps extends IconButtonProps {
	show: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { show, ...other } = props;
	return <IconButton {...other} />;
})(({ show }) => ({
	transform: !show ? 'rotate(0deg)' : 'rotate(180deg)',
	transition: 'transform 0.3s',
}));

const CustomCollapsible = ({ title, children }: { title: string; children: ReactNode }) => {
	const [show, setShow] = useState(true);

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: 2,
					gap: 2,
				}}>
				<Typography variant="h5">{title}</Typography>
				<Box
					sx={{
						display: 'grid',
						placeItems: 'center',
					}}>
					<ExpandMore onClick={() => setShow(!show)} show={show}>
						<CustomIcon
							fontSize={22}
							icon={['fas', 'angle-down']}
							className={!show ? 'fa-rotate-180' : ''}
						/>
					</ExpandMore>
				</Box>
			</Box>
			<Collapse in={show}>{children}</Collapse>
		</Box>
	);
};

export { CustomCollapsible };
