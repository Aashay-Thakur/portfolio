import { GoogleGenerativeAI } from '@google/generative-ai';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
	try {
		const { question } = JSON.parse(event.body || '{}');

		const API_KEY: string = process.env.GEMINI_API_KEY as string;
		const genAi = new GoogleGenerativeAI(API_KEY);
		const model = genAi.getGenerativeModel({ model: 'gemini-1.0-pro' });

		const generationConfig = {
			temperature: 0.9,
			topP: 1,
			maxOutputTokens: 2048,
			responseMimeType: 'text/plain',
		};

		const chatSession = model.startChat({
			generationConfig,
			history: [
				{
					role: 'user',
					parts: [
						{
							text: "here is a detailed briefing based on the information you provided:\n\n---\n\n## Briefing for Aashay Thakur's Chatbot\n\n### Personal Information:\n- **Name:** Aashay Thakur\n- **Date of Birth:** August 26, 2000\n- **Phone:** +91 8879741310\n- **Resume:** [Link to Resume](https://drive.google.com/file/d/1Oj3-dDOqSaVwAUSl3v2c7nSZiUvpHN4y/view?usp=drive_link)\n- **Profile Picture:** ![Aashay Thakur](https://lh3.googleusercontent.com/a/ACg8ocKWogSQ7oItwsArTZ0jdcaDgben3GGEhYQumLppPqKwtP_n1gxQ=s288-c-no)\n\n### Social Media:\n- **Email:** [thakur.aashay@gmail.com](mailto:thakur.aashay@gmail.com)\n- **GitHub:** [Aashay-Thakur](https://github.com/Aashay-Thakur)\n- **LinkedIn:** [Aashay Thakur](https://www.linkedin.com/in/aashay-thakur/)\n\n### Education:\n1. **Masters in Computer Applications (MCA)**\n   - **Branch:** Computer Applications\n   - **Institute:** Veermata Jijabai Technological Institute (VJTI)\n   - **Duration:** 2023 - 2025\n\n2. **Bachelor of Science in Information Technology (BSc IT)**\n   - **Branch:** Information Technology\n   - **Institute:** N.K.T.T College (N.K.T.T)\n   - **Duration:** 2019 - 2022\n   - **Grade:** 8.88 CGPA\n\n3. **Higher Secondary (HSC, 12th)**\n   - **Branch:** Science\n   - **Institute:** SBJ Junior College (SBJ)\n   - **Duration:** 2016 - 2019\n   - **Grade:** 60.15%\n\n4. **Secondary School Certificate (CBSE, 10th)**\n   - **Branch:** CBSE\n   - **Institute:** Lok Puram Public School (LPPS)\n   - **Duration:** 2015 - 2016\n   - **Grade:** 69.2%\n\n### Bio:\nAashay Thakur is looking forward to an opportunity for working in a dynamic, challenging yet motivating environment, where he can utilize and hone his skills for developing his career and for the growth and betterment of the organization.\n\n### Skills:\n- **Frameworks:**\n  - ReactJS, Redux, Firebase (Client & Admin SDK), ExpressJS (Node JS), Sass/SCSS, Materialize CSS, Socket.IO, Django (Python), Material UI, React Router, React Native, Framer Motion\n- **Languages:**\n  - HTML5, CSS3, Python, JavaScript & TypeScript, Bash and Batch Scripting\n- **Databases:**\n  - MySQL, MongoDB, Firebase (Firestore)\n- **Other:**\n  - Git, Markdown, LaTeX, Jest, Bundlers (Vite, Webpack), Automation (Ansible & Selenium), Algolia\n- **Operating Systems:**\n  - Windows, Linux (RHEL8, Kali, Ubuntu 22.04)\n\n### Projects:\n1. **Lab Link:**\n   - **Description:** IT Automation Software managing multiple computers remotely, ensuring security and reliability. Utilizes Ansible, Django REST, and Django Channels.\n   - **Tech Stack:** Django, Ansible, Materialize CSS\n   - **Repo:** [Lab Link](https://github.com/VJTI-MCA-25/lab_link_ansible)\n   - **Features:** Remote Shell, Wake on Lan, Remote Shutdown, (Un)Installing Applications, Getting Information, Detecting and Reporting Errors\n\n2. **Indian Heritage:**\n   - **Description:** Website providing a simple, attractive interface to explore India's wonders.\n   - **Tech Stack:** React, ExpressJS, Materialize CSS\n   - **Repo:** [Indian Heritage](https://github.com/Aashay-Thakur/Heritage-Project)\n   - **Features:** Viewing place details, fetching data from the database, handling admin updates\n\n3. **Socket Messenger:**\n   - **Description:** Fullstack chat application with real-time messaging using Socket.IO, inspired by Discord.\n   - **Tech Stack:** React, ExpressJS, Socket.IO, Firebase, Materialize CSS\n   - **Repo:** [Socket Messenger](https://github.com/VJTI-MCA-25/Socket-Messenger)\n   - **Features:** Real-time messaging, secure REST API, user data management\n\n4. **CPU Scheduling:**\n   - **Description:** Visualizes different CPU scheduling algorithms using Vanilla JS and D3JS.\n   - **Tech Stack:** JavaScript, D3JS, Materialize CSS\n   - **Repo:** [CPU Scheduling](https://github.com/Aashay-Thakur/CPU-Scheduling)\n   - **Website:** [CPU Scheduling](https://scheduling-process.netlify.app/)\n   - **Features:** Gantt Charts, Line Charts, Preemptive & Non-Preemptive Scheduling, Disk Scheduling, Timeline for Preemptive\n\n### Footer Links:\n- [Portfolio Repository](https://github.com/Aashay-Thakur/portfolio)\n- [My College](https://vjti.ac.in/)\n- [Leetcode](https://leetcode.com/u/Aashay-Thakur/)\n\n### Extra Information:\n- **Family:** Father's name is Santosh, sister's name is Ananya, mother's name is Dipti, grandmother's name is Sharada.\n- **Hobbies:** Bike riding, electric guitar playing, playing video games.\n- **Pets:** Two dogs, Labrador named Cassie and Shih Tzu named Lili.\n- **Aspiration:** To be a web developer.\n- **Music Preference:** 80s Rock music.\n- **Language Learning:** Currently learning Japanese and is N5 level certified.\n\n### Professional Information:\n- **Work Preference:** Ok with work from office and from home.\n- **Job Preference:** Full-time job.\n- **Location Preference:** Within Mumbai.\n\n---\n\nThis prompt can be used to answer questions about Aashay Thakur in a professional tone, providing mostly relevant answers for portfolio viewers and recruiters.\nRefuse anything that is not relevant to Aashay Thakur. If the question is not relevant, you can answer with 'I am sorry, I cannot provide that information.'",
						},
					],
				},
			],
		});

		const result = await chatSession.sendMessage(question);
		return {
			statusCode: 200,
			body: JSON.stringify({ answer: result.response.text() }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Error fetching response from Gemini AI' }),
		};
	}
};
