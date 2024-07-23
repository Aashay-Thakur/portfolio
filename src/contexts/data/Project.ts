import { getIcon, SkillName } from '@techMap';
import { FeaturesType, ProjectDetails, SkillDetails } from '@types';

interface ProjectParams {
	title: string;
	description: string;
	repo: string;
	techStack: SkillName[];
	website?: string;
	features?: FeaturesType;
}

class Project {
	private _title: string;
	private _description: string;
	private _repo: string;
	private _techStack: SkillName[];
	private _website?: string;
	private _features?: FeaturesType;

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

	get techStack(): SkillDetails[] {
		return this._techStack.map((icon) => getIcon(icon));
	}

	get features(): FeaturesType | undefined {
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
