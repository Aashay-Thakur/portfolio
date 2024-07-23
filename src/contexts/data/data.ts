import { Education } from './Education';
import { Person } from './Person';
import { Project } from './Project';

const me = new Person({
	name: 'Aashay Thakur',
	dob: new Date(2000, 7, 26),
	phone: '+91 8879741310',
	socials: [
		{ text: 'Email', icon: 'envelope', link: 'thakur.aashay@gmail.com' },
		{ text: 'GitHub', icon: ['fab', 'github'], link: 'https://github.com/Aashay-Thakur' },
		{ text: 'LinkedIn', icon: ['fab', 'linkedin'], link: 'https://www.linkedin.com/in/aashay-thakur/' },
	],
	picture: 'https://lh3.googleusercontent.com/a/ACg8ocKWogSQ7oItwsArTZ0jdcaDgben3GGEhYQumLppPqKwtP_n1gxQ=s288-c-no',
	address: '203, Surya Tower, Tulsidham, Thane West, 400607.',
	education: [
		new Education({
			degree: 'Masters in Computer Applications',
			degreeShort: 'MCA',
			branch: 'Computer Applications',
			institute: 'Veermata Jijabai Technological Institute',
			instituteShort: 'VJTI',
			startYear: 2023,
			endYear: 2025,
		}),
		new Education({
			degree: 'Bachelor of Science in Information Technology',
			degreeShort: 'BSc IT',
			branch: 'Information Technology',
			institute: 'N.K.T.T College',
			instituteShort: 'N.K.T.T',
			startYear: 2019,
			endYear: 2022,
			grade: 8.88,
			gradeOutof: 10,
			gradeType: 'CGPA',
		}),
		new Education({
			degree: 'Higher Secondary',
			degreeShort: 'HSC (12)',
			branch: 'Science',
			institute: 'SBJ Junior College',
			instituteShort: 'SBJ',
			startYear: 2016,
			endYear: 2019,
			grade: 60.15,
			gradeOutof: 100,
			gradeType: 'Percentage',
		}),
		new Education({
			degree: 'Secondary School Certificate',
			degreeShort: 'SSC (10th)',
			branch: 'CBSE',
			institute: 'Lok Puram Public School',
			instituteShort: 'LPPS',
			startYear: 2015,
			endYear: 2016,
			grade: 69.2,
			gradeOutof: 100,
			gradeType: 'Percentage',
		}),
	],
	bio: 'Looking forward to an opportunity for working in a dynamic, challenging yet a motivating environment, where I can utilize and hone my skills for developing my career and for the growth and betterment of the organization.',
	keyPhrases: [
		'opportunity',
		'dynamic, challenging',
		'motivating environment',
		'utilize and hone my skills',
		'growth and betterment',
		'developing my career',
		'organization',
	],
	skills: {
		frameworks: {
			'ReactJS': 'react',
			'Redux': 'redux',
			'Firebase (Client & Admin SDK)': 'firebase',
			'ExpressJS (Node JS)': 'expressjs',
			'Sass or SCSS': 'sass',
			'Materialize CSS': 'materializecss',
			'Socket IO': 'socketio',
			'Django (Python)': 'django',
			'Material UI': 'materialui',
			'React Router': 'reactrouter',
			'React Native': 'reactnative',
			'Framer Motion': 'framermotion',
		},
		languages: {
			'HTML5, CSS3': ['html5', 'css3'],
			'Python': 'python',
			'JavaScript & TypeScript': ['javascript', 'typescript'],
			'Bash and Batch Scripting': 'bash',
		},
		databases: { 'MySQL': 'mysql', 'MongoDB': 'mongodb', 'Firebase (Firestore)': 'firebase' },
		other: {
			'Git': 'git',
			'Markdown': 'markdown',
			'LaTeX': 'latex',
			'Jest': 'jest',
			'Bundlers (Vite, Webpack)': ['vite', 'webpack'],
			'Automation (Ansible & Selenium)': ['ansible', 'selenium'],
			'Algolia': 'algolia',
		},
		os: {
			'Windows': 'windows',
			'Linux (RHEL8, Kali, Ubuntu 22.04)': ['redhat', 'kali', 'ubuntu', 'debian', 'linux'],
		},
	},
	projects: [
		new Project({
			title: 'Lab Link',
			description: `Lab Link Project is an IT Automation Software, with a specific goal of managing multiple Computers Remotely, ensuring Security and Reliance, while providing features likeIt used ansible to executes tasks on remote systems part of the network. Django was used to create a Rest API for executing these tasks. It makes use of Django Channels to create a remote shell interface for the user. It also supports remote Wake on Lan, and Remote Shutdown. Finally Django was used to create a Web Interface for the user to interact with the software.`,
			techStack: ['django', 'ansible', 'materializecss'],
			repo: 'https://github.com/VJTI-MCA-25/lab_link_ansible',
			features: {
				'Remote Shell': [
					{ label: 'Admin', message: 'Admin sends out a signal' },
					'<>',
					{ label: 'Server', message: 'Server broadcasts it to all the Remote Hosts' },
					'<>',
					{ label: 'Network', message: 'Remote Hosts receive the signal and respond' },
				],
				'Wake on Lan': [
					{ label: 'Admin', message: 'Admin Sends Magic Packet' },
					'>',
					{ label: 'Server', message: 'Server resolves the IP to MAC, and sends' },
					'>',
					{ label: 'Network', message: 'The Host wakes up' },
				],
				'Remote Shutdown': [
					{ label: 'Admin', message: 'Admin sends shutdown signal to all or a specific host' },
					'>',
					{ label: 'Server', message: 'Server forwards the request' },
					'>',
					{ label: 'Network', message: 'Hosts receive the signal and shutdown' },
				],
				'(Un)Installing Application': [
					{ label: 'Admin', message: 'Admin can select/view all applications to Installed on Remote Host' },
					'<>',
					{ label: 'Server', message: 'Server can handle Request for All or a specific host' },
					'<>',
					{
						label: 'Network',
						message: 'Hosts receive the signal and install/uninstall the application and report back',
					},
				],
				'Getting Information': [
					{ label: 'Admin', message: 'Admin can view Host details' },
					'<>',
					{ label: 'Server', message: 'Server fetches Host info and sends it to Admin' },
					'<>',
					{ label: 'Network', message: 'Hosts send info to the server' },
				],
				'Detecting and Reporting Errors': [
					{
						label: 'Admin',
						message: 'Admin can get Email Reports of Critical Failure or a general Report on Demand',
					},
					'<',
					{
						label: 'Server',
						message: 'Server Regularly checks in for any errors in System Logs and Bios using IPMI',
					},
					'<>',
					{ label: 'Network', message: 'Hosts send logs to the server for analysis' },
				],
			},
		}),
		new Project({
			title: 'Indian Heritage',
			description:
				'Indian Heritage Website was made with a goal of providing tourists and Indians a simple yet attractive interface to explore all the wonders our country can offer.',
			techStack: ['react', 'expressjs', 'materializecss'],
			repo: 'https://github.com/Aashay-Thakur/Heritage-Project',
			features: [
				{ label: 'Client', message: 'Client can view all the places and their details' },
				'<>',
				{ label: 'Server', message: 'Server fetches the data from the database and sends it to the client' },
				'<>',
				{ label: 'Database', message: 'Database stores all the information about the places' },
			],
		}),
		new Project({
			title: 'Socket Messenger',
			description:
				'A Fullstack Chat Application, that uses Socket IO to provide real-time messaging between users. It was initially made with Discord as a reference, and later evolved into a complex chat application.',
			techStack: ['react', 'expressjs', 'socketio', 'materializecss'],
			repo: 'https://github.com/VJTI-MCA-25/Socket-Messenger',
			features: [
				{ label: 'Network', message: 'Client can send and receive messages in real-time using Websockets' },
				'<->',
				{ label: 'Server', message: 'Server forwards the messages to the respective clients' },
				'<->',
				{ label: 'Database', message: 'Database stores all the messages and user data' },
			],
		}),
		new Project({
			title: 'CPU Scheduling',
			description:
				'CPU Scheduling Website was made in Vanilla JS, using D3JS to display Gantt Charts and Line Charts. It was a small project aiming to visualize different Scheduling Algorithms that Operating Systems use to schedule their processes.',
			techStack: ['javascript', 'd3js', 'materializecss'],
			repo: 'https://github.com/Aashay-Thakur/CPU-Scheduling',
			website: 'https://unique-hamster-14b851.netlify.app/',
		}),
	],
});

export { me, Person, Education, Project };
