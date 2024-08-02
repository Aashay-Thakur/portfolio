import { CustomLink } from '@barrel';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { getIcon, SkillName } from '@techMap';

const Footer = () => {
	const iconList: SkillName[] = ['react', 'typescript', 'materialui', 'framermotion'];
	const icons = iconList.map((icon) => getIcon(icon));

	return (
		<Box
			sx={{
				width: '100%',
				paddingX: 5,
				paddingY: 10,
				backgroundColor: 'background.paper',
			}}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>
						Project Was Made In
					</Typography>
					<Divider />
					<Stack
						direction="row"
						spacing={5}
						sx={{
							marginTop: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						useFlexGap>
						{icons.map((icon, index) => (
							<CustomLink key={`${icon.name}_icon_${index}`} to={icon.link} disableCustomStyles>
								<Box
									sx={{
										'transition': 'transform 0.2s ease-out',
										'&:hover': {
											transform: 'translateY(-5px)',
										},
									}}>
									<img src={icon.src} height={50} width={50} />
								</Box>
							</CustomLink>
						))}
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};

export { Footer };
