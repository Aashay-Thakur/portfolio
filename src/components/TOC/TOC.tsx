import { motion } from 'framer-motion';

import { SimpleTreeView, TreeItem2 as TreeItem } from '@mui/x-tree-view/';
import { TableOfContents } from '@types';

interface TocProps {
	toc: TableOfContents;
	onSelect: (id: string) => void;
}

const TOC = ({ toc, onSelect }: TocProps) => {
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<SimpleTreeView style={{ paddingTop: 20 }}>
			{Object.entries(toc).map(([name, { id, list }], index) => {
				return (
					<motion.div
						key={`motion_parent_${index}`}
						initial="hidden"
						animate="visible"
						variants={itemVariants}
						transition={{ delay: index * 0.1 }}>
						<TreeItem
							style={{ padding: '10px 20px' }}
							key={`parent_${index}`}
							itemId={id}
							label={name}
							onClick={() => !list && onSelect(id)}>
							{list &&
								list.map(({ name, id }, childIndex) => (
									<motion.div
										key={`motion_child_${childIndex}`}
										initial="hidden"
										animate="visible"
										variants={itemVariants}
										transition={{ delay: index * 0.1 + childIndex * 0.05 }}>
										<TreeItem
											style={{ padding: '10px 0' }}
											key={`child_${childIndex}`}
											itemId={id}
											label={name}
											onClick={(e) => {
												e.stopPropagation();
												onSelect(id);
											}}
										/>
									</motion.div>
								))}
						</TreeItem>
					</motion.div>
				);
			})}
		</SimpleTreeView>
	);
};

export { TOC };
