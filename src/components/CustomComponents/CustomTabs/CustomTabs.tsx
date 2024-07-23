import React, { useState } from 'react';

import { Box, Stack, Tab, Tabs } from '@mui/material';

export interface TabInterface {
	label: string;
	content: JSX.Element | string;
}

function a11yProps(index: number) {
	return {
		'id': `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const CustomTabs: React.FC<{ list: TabInterface[] }> = ({ list }) => {
	const [active, setActive] = useState<number>(0);

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setActive(newValue);
	};

	return (
		<Stack>
			<Box sx={{ maxWidth: { xs: 600, sm: '100%' }, borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					variant="scrollable"
					scrollButtons="auto"
					value={active}
					onChange={handleChange}
					aria-label="knowledge and Skills Tabs">
					{list.map((item, index) => (
						<Tab key={`custom_tab_${index}`} label={item.label} {...a11yProps(index)} />
					))}
				</Tabs>
			</Box>
			{list.map((item, index) => (
				<Box
					key={`tabpanel_${index}`}
					role="tabpanel"
					hidden={active !== index}
					id={`simple-tabpanel-${index}`}
					aria-labelledby={`simple-tab-${index}`}
					sx={{ p: 3 }}>
					{active === index && <Box>{item.content}</Box>}
				</Box>
			))}
		</Stack>
	);
};

export { CustomTabs };
