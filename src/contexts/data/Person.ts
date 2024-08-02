import { EmailSharp, LinkSharp } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getIcon, SkillName } from '@techMap';
import { AboutMe, ContactInfo, EducationDetails, ProjectDetails, SkillCategories, SocialLink } from '@types';

import { Education } from './Education';
import { Project } from './Project';

interface PersonParams {
	name: string;
	dob: string | Date;
	phone: string;
	resume?: string;
	socials: {
		email: string;
		linkedin: string;
		github: string;
	};
	education: Education[];
	bio: {
		text: string;
		keyPhrases?: string[];
	};
	skills: SkillsParam;
	projects: Project[];
	picture?: string;
	footerLinks?: { text: string; link: string }[];
}

type SkillsParam = {
	[key: string]: {
		[key: string]: SkillName | SkillName[];
	};
};

class Person {
	private _name: string;
	private _dob: Date;
	private _phone: string;
	private _resume?: string;
	private _socials: {
		email: string;
		linkedin: string;
		github: string;
	};
	private _education: Education[];
	private _bio: {
		text: string;
		keyPhrases?: string[];
	};
	private _skills: SkillsParam;
	private _projects: Project[];
	private _picture?: string;
	private _footerLinks?: { text: string; link: string }[];

	constructor(params: PersonParams) {
		const { name, dob, phone, socials, education, bio, skills, projects, picture, resume, footerLinks } = params;

		if (!name || !dob || !phone || !socials || !education || !bio || !skills || !projects) {
			throw new Error('Invalid data provided to Person constructor');
		}

		this._name = name;
		this._phone = phone;
		this._socials = socials;
		this._education = education;
		this._bio = bio;
		this._skills = skills;
		this._projects = projects;
		this._picture = picture;
		this._resume = resume;
		this._footerLinks = footerLinks;

		if (typeof dob === 'string') {
			this._dob = new Date(dob);
		} else {
			this._dob = dob;
		}
	}

	static attachMailto(mail: string) {
		if (/^e?-?mail(?:\saddress)?$/i.test(mail) && !mail.startsWith('mailto')) {
			return `mailto:${mail}`;
		}
		return mail;
	}

	static initialsFromName(name: string) {
		const [first, ...rest] = name.split(' ');
		const last = rest[rest.length - 1];
		return `${first[0].toUpperCase()}${last[0].toUpperCase()}`;
	}

	public static fromJson(data: any): Person {
		const { name, dob, phone, socials, education, bio, skills, projects, picture, resume, footerLinks } = data;

		return new Person({
			name,
			dob,
			phone,
			socials,
			education: education.map((edu: any) => new Education(edu)),
			bio,
			skills,
			projects: projects.map((proj: any) => new Project(proj)),
			picture,
			resume,
			footerLinks,
		});
	}

	get name() {
		return this._name;
	}

	get age() {
		return new Date().getFullYear() - this._dob.getFullYear();
	}

	get dob() {
		return this._dob;
	}

	get phone() {
		return this._phone;
	}

	get socials(): SocialLink[] {
		return Object.entries(this._socials).map(([key, entry]) => {
			switch (key) {
				case 'email':
					return { text: 'Email', link: Person.attachMailto(entry), icon: EmailSharp };
				case 'linkedin':
					return { text: 'LinkedIn', link: entry, icon: LinkedInIcon };
				case 'github':
					return { text: 'GitHub', link: entry, icon: GitHubIcon };
				default:
					return { text: key, link: entry, icon: LinkSharp };
			}
		});
	}

	get resume() {
		if (this._resume?.includes('drive.google.com') && this._resume?.includes('file/d/')) {
			let idMatch = this._resume.match(/file\/d\/([a-zA-Z0-9_-]+)/);
			if (idMatch && idMatch[1]) {
				return {
					file: this._resume,
					download: `https://drive.google.com/uc?export=download&id=${idMatch[1]}`,
				};
			}
		}
		return this._resume;
	}

	get picture() {
		return this._picture;
	}

	get education() {
		return this._education;
	}

	get bio() {
		return this._bio;
	}

	get contact(): ContactInfo {
		return {
			name: this.name,
			age: this.age,
			phone: this.phone,
			socials: this.socials,
			resume: this.resume,
			id: 'contact-information',
		};
	}

	get aboutMe(): AboutMe {
		return {
			name: this.name,
			age: this.age,
			bio: this.bio,
			picture: this.picture,
			initials: Person.initialsFromName(this._name),
			id: 'about-me',
		};
	}

	get academics(): { education: EducationDetails[]; id: string } {
		const education = this._education.map((edu) => edu.education);
		return {
			id: 'academic-history',
			education,
		};
	}

	get skills(): { categories: SkillCategories; id: string } {
		const categories: SkillCategories = {};

		for (const category in this._skills) {
			categories[category] = {};

			for (const skill in this._skills[category]) {
				const iconNames = this._skills[category][skill];

				categories[category][skill] = Array.isArray(iconNames)
					? iconNames.map((name) => getIcon(name))
					: getIcon(iconNames);
			}
		}
		return { id: 'skills', categories };
	}

	get projects(): { projects: ProjectDetails[]; id: string } {
		const projects = this._projects.map((proj) => proj.project);
		return {
			id: 'projects',
			projects,
		};
	}

	get footerLinks() {
		return this._footerLinks;
	}

	get toc() {
		const aboutMeId = this.aboutMe.id;
		const contactId = this.contact.id;
		const academicsId = this.academics.id;
		const skillsId = this.skills.id;
		const projectsId = this.projects.id;

		const projectsToc = this._projects.map((project, index) => ({
			name: project.title,
			id: `${projectsId}_${index}`,
		}));
		const educationToc = this._education.map((edu, index) => ({
			name: edu.degree.short,
			id: `${academicsId}_${index}`,
		}));

		return {
			'About Me': { id: aboutMeId },
			'Contact Information': { id: contactId },
			'Academic History': { id: academicsId, list: educationToc },
			'Skills': { id: skillsId },
			'Projects': { id: projectsId, list: projectsToc },
		};
	}
}

export { Person };
