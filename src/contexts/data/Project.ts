import { getIcon, SkillName } from '@techMap';
import { FeaturesType, ProjectDetails, SkillDetails } from '@types';

export interface ProjectParams {
	title: string;
	description: string;
	repo: string;
	techStack: Partial<Record<SkillName, string>>;
	features: FeaturesType;
	website?: string;
}

class Project {
	private _title: string;
	private _description: string;
	private _repo: string;
	private _techStack: Partial<Record<SkillName, string>>;
	private _features: FeaturesType;
	private _website?: string;

	constructor(params: ProjectParams) {
		const { title, description, repo, techStack, website, features } = params;

		if (!title || !description || !repo || !techStack) {
			throw new Error('Invalid data provided to Project constructor');
		}

		this._title = title;
		this._description = description;
		this._repo = repo;
		this._techStack = techStack;
		this._website = website;
		this._features = features;
	}

	get title(): string {
		return this._title;
	}

	get description(): string {
		return this._description;
	}

	get links(): { repo: string; website?: string } {
		return {
			repo: this._repo,
			website: this._website,
		};
	}

	get techStack(): (SkillDetails & { description: string })[] {
		return Object.entries(this._techStack).map(([icon, description]) => ({
			...getIcon(icon as SkillName),
			description,
		}));
	}

	get features(): FeaturesType {
		return this._features;
	}

	get project(): ProjectDetails {
		return {
			title: this.title,
			description: this.description,
			links: this.links,
			techStack: this.techStack,
			features: this.features,
		};
	}
}

export { Project };
