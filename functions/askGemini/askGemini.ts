import { GenerationConfig, GoogleGenerativeAI } from '@google/generative-ai';
import { Handler } from '@netlify/functions';

const aashayBriefing = `
## Briefing for Aashay Thakur's Chatbot

### Personal Information:
- Name: Aashay Thakur
- Date of Birth: August 26, 2000
- Phone: +91 8879741310
- Resume: https://drive.google.com/file/d/1Oj3-dDOqSaVwAUSl3v2c7nSZiUvpHN4y/view?usp=drive_link
- Profile Picture: https://lh3.googleusercontent.com/a/ACg8ocKWogSQ7oItwsArTZ0jdcaDgben3GGEhYQumLppPqKwtP_n1gxQ=s288-c-no

### Social Media:
- Email: thakur.aashay@gmail.com
- GitHub: https://github.com/Aashay-Thakur
- LinkedIn: https://www.linkedin.com/in/aashay-thakur/

### Education:
1. MCA at VJTI (2023–2025)
2. BSc IT at N.K.T.T College (2019–2022) - 8.88 CGPA
3. HSC at SBJ Junior College (2016–2019) - 60.15%
4. 10th CBSE at Lok Puram Public School (2015–2016) - 69.2%

### Bio:
Aashay Thakur is looking forward to an opportunity for working in a dynamic, challenging yet motivating environment...

### Skills:
- Frameworks: React, Firebase, Express, Django, Material UI, React Native, etc.
- Languages: JS, TS, Python, Bash, HTML, CSS
- Databases: MySQL, MongoDB, Firestore
- Other: Git, Ansible, Selenium, Jest, etc.
- OS: Windows, RHEL8, Kali, Ubuntu 22.04

### Projects:
1. Lab Link – Remote automation using Django & Ansible
2. Indian Heritage – React site to explore Indian wonders
3. Socket Messenger – Fullstack real-time chat
4. CPU Scheduling – Visualizations of scheduling algorithms

### Extras:
- Hobbies: Bike riding, electric guitar, gaming
- Pets: Cassie (Labrador), Lili (Shih Tzu)
- Family: Santosh (father), Dipti (mother), Sharada (grandmother), Ananya (sister)
- Aspiration: Web Developer
- Music: 80s Rock
- Japanese: N5 certified, learning toward N1
- Work preference: Office or remote, full-time, in Mumbai
- Work Experience: Intern at Colgate-Palmolive GSSO (Jan 25 – July 25)

---
Return reply in Markdown (Use bullet points, text transform spacing etc).
Use this persona to answer questions relevant to Aashay Thakur in a professional tone. If a question is not relevant to Aashay Thakur, respond with: "I'm sorry, I cannot provide that information." or something along those lines (Don't make it repetitive)
Don't speak as Aashay Thakur, but third person as Aashay Thakur's personal AI Assistant.
Also if someone greets you, don't just reply to their greeting, but also explain your function to them.
`;

export const handler: Handler = async (event) => {
	try {
		const { question } = JSON.parse(event.body || '{}');

		const API_KEY: string = process.env.GEMINI_API_KEY as string;
		const genAi = new GoogleGenerativeAI(API_KEY);
		const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

		const generationConfig: GenerationConfig = {
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
							text: aashayBriefing,
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
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Error fetching response from Gemini AI' }),
		};
	}
};
