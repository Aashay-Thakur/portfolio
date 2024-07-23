import { ProfileCard } from '@barrel';
import { AboutMe as AboutMeType } from '@types';

const AboutMe = ({ aboutMe }: { aboutMe: AboutMeType }) => {
	return (
		<section id={aboutMe.id} className="about-me" aria-label="About Me Section">
			<ProfileCard aboutMe={aboutMe} />
		</section>
	);
};

export { AboutMe };
