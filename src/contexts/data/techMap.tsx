import { SkillDetails } from '@types';

// import sprite from '@assets/sprite.svg';

const map = {
	mysql: {
		name: 'MySQL',
		icon: 'mysql.svg',
		link: 'https://www.mysql.com/',
		wikiTopic: 'MySQL',
	},
	mongodb: {
		name: 'MongoDB',
		icon: 'mongodb.svg',
		link: 'https://www.mongodb.com/',
		wikiTopic: 'MongoDB',
	},
	firebase: {
		name: 'Firebase',
		icon: 'firebase.svg',
		link: 'https://firebase.google.com/',
		wikiTopic: 'Firebase',
	},
	html5: {
		name: 'HTML5',
		icon: 'html5.svg',
		link: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
		wikiTopic: 'HTML5',
	},
	css3: {
		name: 'CSS3',
		icon: 'css3.svg',
		link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
		wikiTopic: 'CSS3',
	},
	python: {
		name: 'Python',
		icon: 'python.svg',
		link: 'https://www.python.org/',
		wikiTopic: 'Python_(programming_language)',
	},
	javascript: {
		name: 'JavaScript',
		icon: 'javascript.svg',
		link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
		wikiTopic: 'JavaScript',
	},
	typescript: {
		name: 'TypeScript',
		icon: 'typescript.svg',
		link: 'https://www.typescriptlang.org/',
		wikiTopic: 'TypeScript',
	},
	bash: {
		name: 'Bash',
		icon: 'bash.svg',
		link: 'https://www.gnu.org/software/bash/',
		wikiTopic: 'Bash_(Unix_shell)',
	},
	react: {
		name: 'ReactJS',
		icon: 'react.svg',
		link: 'https://reactjs.org/',
		wikiTopic: 'React_(JavaScript_library)',
	},
	redux: {
		name: 'Redux',
		icon: 'redux.svg',
		link: 'https://redux.js.org/',
		wikiTopic: 'Redux_(JavaScript_library)',
	},
	expressjs: {
		name: 'ExpressJS',
		icon: 'expressjs.svg',
		link: 'https://expressjs.com/',
		wikiTopic: 'Express.js',
	},
	sass: {
		name: 'Sass',
		icon: 'sass.svg',
		link: 'https://sass-lang.com/',
		wikiTopic: 'Sass_(stylesheet_language)',
	},
	materializecss: {
		name: 'Materialize CSS',
		icon: 'materializecss.svg',
		link: 'https://materializecss.com/',
		wikiTopic: 'Materialize_(CSS_framework)',
	},
	socketio: {
		name: 'Socket.IO',
		icon: 'socketio.svg',
		link: 'https://socket.io/',
		wikiTopic: 'Socket.IO',
	},
	django: {
		name: 'Django',
		icon: 'django.svg',
		link: 'https://www.djangoproject.com/',
		wikiTopic: 'Django_(web_framework)',
	},
	materialui: {
		name: 'Material UI',
		icon: 'materialui.svg',
		link: 'https://mui.com/',
		wikiTopic: 'Material-UI',
	},
	reactrouter: {
		name: 'React Router',
		icon: 'reactrouter.svg',
		link: 'https://reactrouter.com/',
		wikiTopic: 'React_Router',
	},
	reactnative: {
		name: 'React Native',
		icon: 'reactnative.svg',
		link: 'https://reactnative.dev/',
		wikiTopic: 'React_Native',
	},
	framermotion: {
		name: 'Framer Motion',
		icon: 'framermotion.svg',
		link: 'https://www.framer.com/motion/',
		wikiTopic: 'Framer_Motion',
	},
	windows: {
		name: 'Windows',
		icon: 'windows.svg',
		link: 'https://www.microsoft.com/en-us/windows',
		wikiTopic: 'Microsoft_Windows',
	},
	linux: {
		name: 'Linux',
		icon: 'linux.svg',
		link: 'https://www.linux.org/',
		wikiTopic: 'Linux',
	},
	kali: {
		name: 'Kali Linux',
		icon: 'kali.svg',
		link: 'https://www.kali.org/',
		wikiTopic: 'Kali_Linux',
	},
	ubuntu: {
		name: 'Ubuntu',
		icon: 'ubuntu.svg',
		link: 'https://ubuntu.com/',
		wikiTopic: 'Ubuntu',
	},
	debian: {
		name: 'Debian',
		icon: 'debian.svg',
		link: 'https://www.debian.org/',
		wikiTopic: 'Debian',
	},
	redhat: {
		name: 'RHEL',
		icon: 'redhat.svg',
		link: 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux',
		wikiTopic: 'Red_Hat_Enterprise_Linux',
	},
	git: {
		name: 'Git',
		icon: 'git.svg',
		link: 'https://git-scm.com/',
		wikiTopic: 'Git',
	},
	markdown: {
		name: 'Markdown',
		icon: 'markdown.svg',
		link: 'https://daringfireball.net/projects/markdown/',
		wikiTopic: 'Markdown',
	},
	latex: {
		name: 'LaTeX',
		icon: 'latex.svg',
		link: 'https://www.latex-project.org/',
		wikiTopic: 'LaTeX',
	},
	jest: {
		name: 'Jest',
		icon: 'jest.svg',
		link: 'https://jestjs.io/',
		wikiTopic: 'Jest_(JavaScript_framework)',
	},
	vite: {
		name: 'Vite',
		icon: 'vitejs.svg',
		link: 'https://vitejs.dev/',
		wikiTopic: 'Vite_(build_tool)',
	},
	webpack: {
		name: 'Webpack',
		icon: 'webpack.svg',
		link: 'https://webpack.js.org/',
		wikiTopic: 'Webpack',
	},
	ansible: {
		name: 'Ansible',
		icon: 'ansible.svg',
		link: 'https://www.ansible.com/',
		wikiTopic: 'Ansible_(software)',
	},
	selenium: {
		name: 'Selenium',
		icon: 'selenium.svg',
		link: 'https://www.selenium.dev/',
		wikiTopic: 'Selenium_(software)',
	},
	algolia: {
		name: 'Algolia',
		icon: 'algolia.svg',
		link: 'https://www.algolia.com/',
		wikiTopic: 'Algolia',
	},
	d3js: {
		name: 'D3JS',
		icon: 'd3.svg',
		link: 'https://d3js.org/',
		wikiTopic: 'D3.js',
	},
} as const;

export type SkillName = keyof typeof map;

const blacklist: SkillName[] = ['ansible', 'markdown', 'expressjs'];

export function getIcon(name: SkillName): SkillDetails {
	name = name.toLowerCase().trim() as SkillName;
	var src = `/assets/icons/${map[name].icon}`;
	if (blacklist.includes(name)) {
		const mode = getComputedStyle(document.documentElement).getPropertyValue('--mui-palette-mode');
		if (mode === 'dark') {
			src = src.replace('.svg', '_alt.svg');
		}
	}
	return {
		...map[name],
		src,
		wikiLink: `https://en.wikipedia.org/wiki/${map[name].wikiTopic}`,
		key: name,
	};
}
