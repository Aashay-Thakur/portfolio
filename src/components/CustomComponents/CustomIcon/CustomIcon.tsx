import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

const CustomIcon = (props: FontAwesomeIconProps) => {
	return <FontAwesomeIcon {...props} aria-hidden />;
};

export { CustomIcon };
