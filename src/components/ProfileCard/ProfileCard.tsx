import { m, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';

import { Avatar, Box, Container, CSSObject, styled, Typography, useTheme } from '@mui/material';
import { SettingsContext } from '@settings';
import { AboutMe } from '@types';
import { fillGenerator } from '@utils/helper';

import { Waves } from './Waves';

const MotionBox = m.create(Box);

const StyledMotionBox = styled(MotionBox)(({ theme }) => {
	const styles: CSSObject = {
		...theme.mixins.glassMorphism(theme, { gradientOpacity: 0.65 }),
		width: '100%',
	};

	return styles;
});

const ProfileCard = ({ aboutMe }: { aboutMe: AboutMe }) => {
	const [text, setText] = useState<string>('');
	const [done, setDone] = useState<boolean>(false);
	const [waveState, setWaveState] = useState<'fluid' | 'line'>('fluid');

	const theme = useTheme();
	const { disableAnimations } = useContext(SettingsContext);

	const textBoxRef = useRef<HTMLDivElement | null>(null);

	const checkAnimSetting = (props: any) => (disableAnimations ? {} : props);

	const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll();
	const card1Y = useTransform(scrollYProgress, [0, 1], [0, 1200]);
	const card2Y = useTransform(scrollYProgress, [0, 1], [0, -500]);

	useEffect(() => {
		const fillText = async () => {
			setText('');
			setDone(false);

			if (disableAnimations) {
				setText(aboutMe.bio.text);
				setDone(true);
				return;
			}

			const generator = fillGenerator(aboutMe.bio.text, 3);
			for await (const partial of generator) {
				setText(partial.text);
				if (partial.done) setDone(true);
			}
		};

		fillText();
	}, [aboutMe.bio.text, disableAnimations]);

	const highlightText = (text: string) => {
		const keyPhrases = [
			'opportunity',
			'dynamic, challenging',
			'motivating environment',
			'utilize and hone my skills',
			'growth and betterment',
			'developing my career',
			'organization',
		];
		const parts = text.split(new RegExp(`(${keyPhrases.join('|')})`, 'gi'));

		return parts.map((part, index) =>
			keyPhrases.includes(part.toLowerCase()) ? (
				<span
					key={index}
					style={{
						position: 'relative',
						zIndex: 0,
					}}>
					{part}
					<m.span
						key={index}
						initial={{ width: disableAnimations ? '100%' : 0 }}
						animate={done && checkAnimSetting({ width: '100%' })}
						style={{
							position: 'absolute',
							height: '3px',
							left: 0,
							bottom: '-3px',
							background: theme.mixins.linearGradient(theme, { direction: 'to left' }),
							transformOrigin: 'left center',
							zIndex: 1,
							mixBlendMode: 'difference',
							pointerEvents: 'none',
						}}
						transition={{ duration: 0.5, delay: index * 0.2, ease: 'circOut' }}
					/>
				</span>
			) : (
				part
			),
		);
	};

	return (
		<Container
			sx={{
				position: 'relative',
				marginTop: 5,
			}}>
			<MotionBox
				initial={{ y: 0 }}
				style={{ y: card1Y }}
				onClick={() => setWaveState((prev) => (prev === 'fluid' ? 'line' : 'fluid'))}
				sx={{
					position: 'relative',
					display: 'grid',
					placeItems: 'center',
				}}>
				<Waves type={waveState} disableAnimations={disableAnimations} />
				<Avatar
					sx={{
						backgroundColor: 'primary.main',
						height: '150px',
						width: '150px',
						fontSize: '3rem',
						transform: 'translateY(-5%)',
						bottom: 10,
					}}
					src={aboutMe.picture}>
					{aboutMe.initials}
				</Avatar>
			</MotionBox>
			<StyledMotionBox style={{ y: card2Y }} sx={{ padding: { xs: 2, md: 6 } }}>
				<Typography variant="h3" align="center" gutterBottom>
					{aboutMe.name}
				</Typography>
				<Typography ref={textBoxRef} className="text-box" variant="body1" align="center">
					{highlightText(text)}
				</Typography>
			</StyledMotionBox>
		</Container>
	);
};

export { ProfileCard };
