import { Slide, Snackbar, SnackbarProps } from '@mui/material';

const CustomSnackbar = (props: SnackbarProps) => {
	return (
		<Snackbar
			message="This is the default snackbar message."
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			TransitionComponent={Slide}
			{...props}
			autoHideDuration={5000}
		/>
	);
};

export { CustomSnackbar };
