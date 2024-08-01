import { m } from 'framer-motion';

import { SimpleTreeView, TreeItem2 as TreeItem } from '@mui/x-tree-view/';
import { TableOfContents } from '@types';

const TOC = ({ toc, onSelect }: { toc: TableOfContents; onSelect: (id: string) => void }) => {
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<SimpleTreeView style={{ paddingTop: 20 }}>
			{Object.entries(toc).map(([name, { id, list }], index) => {
				return (
					<m.div
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
									<m.div
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
									</m.div>
								))}
						</TreeItem>
					</m.div>
				);
			})}
		</SimpleTreeView>
	);
};

export { TOC };
