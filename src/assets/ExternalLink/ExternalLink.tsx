import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ExternalLink.module.scss';

const ExternalLink = ({ active, size = 1 }: { active: boolean; size?: number }) => {
	return (
		<div
			style={{
				height: `${size * 1}em`,
				width: `${size * 1}em`,
			}}
			className={`${styles.container} ${active ? styles.active : ''}`}>
			<FontAwesomeIcon icon={['far', 'square']} className={styles.square} />
			<FontAwesomeIcon icon={['fas', 'arrow-up']} className={styles.arrow} />
		</div>
	);
};

export { ExternalLink };
