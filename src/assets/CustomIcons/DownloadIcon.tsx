import { easeOut, m } from 'framer-motion';

import { SvgIcon } from '@mui/material';

interface DownloadIconProps {
	active: boolean;
}

const DownloadIcon = ({ active = false }: DownloadIconProps) => {
	return (
		<SvgIcon focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={{ overflow: 'hidden' }}>
			<m.path
				initial={{ y: 0 }}
				animate={
					active
						? {
								y: 5,
								transition: {
									duration: 0.3,
									ease: easeOut,
								},
						  }
						: { y: 0 }
				}
				d="M 19 9 h -4 V 3 H 9 v 6 H 5 l 7 7 Z"></m.path>
			<path d="M 5 22 v 2 h 14 v -2 Z"></path>
		</SvgIcon>
	);
};

export { DownloadIcon };
