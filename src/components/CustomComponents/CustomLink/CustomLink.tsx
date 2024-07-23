import { ReactNode, useContext, useState } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { ExternalLink } from '@assets/ExternalLink/ExternalLink';
import { Link as MuiLink, LinkProps as MuiLinkProps, Stack, styled } from '@mui/material';
import { SettingsContext } from '@settings';

interface MyLinkProps {
	disableCustomStyles?: boolean;
	shouldUseIcon?: boolean;
	children: ReactNode;
}

const StyledMuiLink = styled(MuiLink, {
	shouldForwardProp: (prop) => prop !== 'disableCustomStyles' && prop !== 'disableAnimation',
})<MyLinkProps & MuiLinkProps & { disableAnimation: boolean }>(({ theme, disableCustomStyles, disableAnimation }) => {
	if (disableAnimation || disableCustomStyles) return {};

	const linearGradient = theme.mixins.linearGradient(theme);

	return {
		'position': 'relative',
		'& > div': {
			transition: 'transform 0.2s ease-out, color 0.2s ease-out',
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			display: 'block',
			width: '100%',
			height: '2px',
			bottom: 0,
			left: 0,
			transformOrigin: 'center',
			transition: 'transform 0.2s ease-out',
			transform: 'scale(0)',
			background: linearGradient,
		},
		'&:hover': {
			'color': theme.palette.primary.main,
			'& > div': {
				transform: 'translateY(-5px)',
				background: linearGradient,
				backgroundClip: 'text',
				webkitBackgroundClip: 'text',
				webkitTextFillColor: 'transparent',
				color: 'transparent',
			},
			'&::after': {
				transform: 'scale(1)',
			},
		},
	};
});

const CustomLink = (props: MyLinkProps & RouterLinkProps) => {
	const { disableCustomStyles, children, shouldUseIcon = false, ...rest } = props;
	const { disableAnimations } = useContext(SettingsContext);
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
			<StyledMuiLink
				component={RouterLink}
				color="inherit"
				underline="none"
				disableCustomStyles={disableCustomStyles}
				disableAnimation={disableAnimations}
				{...rest}>
				<Stack
					component="div"
					direction="row"
					spacing={1}
					sx={{ justifyContent: 'center', alignItems: 'center' }}
					useFlexGap>
					{children}
					{shouldUseIcon && <ExternalLink size={0.8} active={!disableAnimations && hovering} />}
				</Stack>
			</StyledMuiLink>
		</div>
	);
};

export { CustomLink };
