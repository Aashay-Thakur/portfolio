import { getIcon, SkillName } from '@techMap';
import { AboutMe, ContactInfo, EducationDetails, ProjectDetails, SkillCategories, SocialLink } from '@types';

import { Education } from './Education';
import { Project } from './Project';

interface PersonParams {
	name: string;
	dob: Date;
	phone: string;
	socials: SocialLink[];
	address: string;
	education: Education[];
	bio: string;
	skills: SkillsParam;
	projects: Project[];
	picture?: string;
	resumeLink?: string;
	keyPhrases?: string[];
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
	private _socials: SocialLink[];
	private _address: string;
	private _education: Education[];
	private _bio: string;
	private _skills: SkillsParam;
	private _projects: Project[];
	private _keyPhrases?: string[];
	private _picture?: string;
	private _resumeLink?: string;

	constructor(params: PersonParams) {
		const {
			name,
			dob,
			phone,
			socials,
			address,
			education,
			bio,
			skills,
			projects,
			picture,
			resumeLink,
			keyPhrases,
		} = params;

		if (!name || !dob || !phone || !socials || !address || !education || !bio || !skills || !projects) {
			throw new Error('Invalid data provided to Person constructor');
		}

		this._name = name;
		this._dob = dob;
		this._phone = phone;
		this._socials = socials;
		this._address = address;
		this._education = education;
		this._bio = bio;
		this._skills = skills;
		this._projects = projects;
		this._picture = picture;
		this._resumeLink = resumeLink;
		this._keyPhrases = keyPhrases;
	}

	static attachMailto(socials: SocialLink[]) {
		return socials.map((link) => {
			if (/^e?-?mail(?:\saddress)?$/i.test(link.text) && !link.link.startsWith('mailto')) {
				return { ...link, link: `mailto:${link.link}` };
			}
			return link;
		});
	}

	static initialsFromName(name: string) {
		const [first, ...rest] = name.split(' ');
		const last = rest[rest.length - 1];
		return `${first[0].toUpperCase()}${last[0].toUpperCase()}`;
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

	get socials() {
		return Person.attachMailto(this._socials);
	}

	get picture() {
		return this._picture;
	}

	get address() {
		return this._address;
	}

	get education() {
		return this._education;
	}

	get bio() {
		return this._bio;
	}

	get resumeLink() {
		return this._resumeLink;
	}

	get keyPhrases() {
		return this._keyPhrases;
	}

	get contact(): ContactInfo {
		return {
			name: this._name,
			age: this.age,
			phone: this._phone,
			socials: this.socials,
			address: this._address,
			id: 'contact-information',
		};
	}

	get aboutMe(): AboutMe {
		return {
			name: this._name,
			age: this.age,
			bio: { text: this._bio, keyPhrases: this.keyPhrases },
			picture: this._picture,
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
