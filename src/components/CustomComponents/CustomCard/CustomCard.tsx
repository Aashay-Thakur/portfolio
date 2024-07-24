import { forwardRef, ReactNode } from 'react';

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardHeaderProps,
	CardMedia,
	CardMediaProps,
	CardProps,
	styled,
} from '@mui/material';

interface CustomCardProps {
	cardProps?: CardProps;
	headerProps?: CardHeaderProps;
	mediaProps?: CardMediaProps & { alt?: string };
	actions?: { title: string; link: string }[];
	header?: boolean;
	media?: boolean;
	children?: ReactNode;
}

const StyledCard = styled(Card)({
	'width': 350,
	'maxHeight': 500,
	'overflowY': 'auto',
	'boxShadow': 'none',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	'background': 'none',
	'color': 'inherit',
	'margin': 'auto',
});

const StyledCardMedia = styled(CardMedia)({
	maxWidth: '100%',
	height: 'auto',
	maxHeight: 200,
	minHeight: 100,
	width: 'auto',
	margin: 'auto',
	background: 'none',
	padding: 20,
});

const StyledCardContent = styled(CardContent)({
	borderBottom: '1px solid',
	borderColor: 'divider',
	background: 'none',
});

const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>((props: CustomCardProps, ref) => {
	const { cardProps, headerProps, mediaProps, actions, header, media, children } = props;

	return (
		<StyledCard ref={ref} {...cardProps}>
			{(header || headerProps) && <CardHeader {...headerProps} />}
			{(media || mediaProps) && <StyledCardMedia {...mediaProps} />}
			<StyledCardContent>{children}</StyledCardContent>
			{actions && (
				<CardActions>
					{actions.map((action, index) => (
						<Button color="inherit" key={index} size="small" href={action.link} target="_blank">
							{action.title}
						</Button>
					))}
				</CardActions>
			)}
		</StyledCard>
	);
});

export { CustomCard };
