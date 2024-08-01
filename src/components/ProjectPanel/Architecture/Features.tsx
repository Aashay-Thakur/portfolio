import { useState } from 'react';

import { Box, Grid, styled, Typography } from '@mui/material';
import { FeatureList, FeaturesType } from '@types';
import { isObject } from '@utils/helper';

import { Animation } from './Animation';

interface StyledTypographyProps {
	active: boolean;
}

const StyledTypography = styled(Typography, { shouldForwardProp: (prop) => prop !== 'active' })<StyledTypographyProps>(
	({ theme, active }) => {
		return {
			'position': 'relative',
			'width': 'max-content',
			'cursor': 'pointer',
			'&::after': {
				content: "''",
				backgroundColor: theme.palette.secondary.main,
				height: 2,
				width: '100%',
				position: 'absolute',
				bottom: -1,
				left: 0,
				transform: `scaleX(${active ? 1 : 0})`,
				transition: 'transform 0.3s ease-out',
				transformOrigin: 'left',
			},
		};
	},
);

const isFeatureList = (features: FeaturesType): features is FeatureList => !isObject(features);

const Features = ({ features }: { features: FeaturesType }) => {
	if (isFeatureList(features)) {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Animation key="only_feature" list={features} />
				</Grid>
			</Grid>
		);
	}

	const featureKeys = Object.keys(features);
	const [activeFeature, setActiveFeature] = useState<string>(featureKeys[0]);

	return (
		<Grid container>
			<Grid item xs={12} md={4} lg={3}>
				<ul style={{ paddingLeft: 20 }}>
					{featureKeys.map((feature, index) => {
						return (
							<li key={`feature_${index}`} style={{ listStyleType: 'none', padding: 2 }}>
								<StyledTypography
									active={activeFeature === feature}
									onClick={() => setActiveFeature(feature)}
									variant="body2"
									key={`feature_${index}`}>
									{feature}
								</StyledTypography>
							</li>
						);
					})}
				</ul>
			</Grid>
			{features[activeFeature].length > 0 && (
				<Grid
					item
					xs={12}
					md={8}
					lg={9}
					sx={{
						display: 'grid',
						placeItems: 'center',
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							width: '100%',
							height: 100,
						}}>
						<Animation key={activeFeature} list={features[activeFeature]} />
					</Box>
				</Grid>
			)}
		</Grid>
	);
};

export { Features };
