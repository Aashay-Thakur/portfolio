import { ProjectDetails } from '@types';

import { Features } from './Features';

interface ArchitectureProps {
	features: ProjectDetails['features'];
}

const Architecture = ({ features }: ArchitectureProps) => {
	return <Features features={features} />;
};

export { Architecture };
