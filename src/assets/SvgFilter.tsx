const SvgFilters = () => (
	<svg height="0" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
		<filter id="protanopia-filter">
			<feColorMatrix
				type="matrix"
				values="0.567 0.433 0 0 0
                  0.558 0.442 0 0 0
                  0 0.242 0.758 0 0
                  0 0 0 1 0"
			/>
		</filter>
		<filter id="deuteranopia-filter">
			<feColorMatrix
				type="matrix"
				values="0.625 0.375 0 0 0
                  0.7 0.3 0 0 0
                  0 0.3 0.7 0 0
                  0 0 0 1 0"
			/>
		</filter>
		<filter id="tritanopia-filter">
			<feColorMatrix
				type="matrix"
				values="0.95 0.05 0 0 0
                  0 0.433 0.567 0 0
                  0 0.475 0.525 0 0
                  0 0 0 1 0"
			/>
		</filter>
	</svg>
);

export default SvgFilters;
