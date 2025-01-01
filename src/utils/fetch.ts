import { SendResumeParams, SendResumeResponse } from '@types';

interface WikipediaQueryResponse {
	batchcomplete: string;
	query: {
		pages: {
			[key: string]: {
				pageid: number;
				ns: number;
				title: string;
				extract: string;
				thumbnail?: {
					source: string;
					width: number;
					height: number;
				};
				pageprops?: {
					pronounciation?: string;
				};
			};
		};
	};
}

export interface Extract {
	title: string;
	extract: string;
	thumbnail?: string;
	pronounciation?: string;
}

export async function fetchWiki(topic: string | string[]): Promise<Extract> {
	const url = 'https://en.wikipedia.org/w/api.php';
	const params: any = {
		action: 'query',
		format: 'json',
		prop: 'extracts|pageimages|pageprops',
		exintro: true,
		explaintext: true,
		piprop: 'thumbnail',
		pithumbsize: 500,
		titles: topic,
		origin: '*',
	};

	const queryString = new URLSearchParams(params).toString();
	const fullUrl = `${url}?${queryString}`;

	const data: WikipediaQueryResponse = await (await fetch(fullUrl)).json();
	const pages = data.query.pages;

	for (const pageId in pages) {
		if (pages.hasOwnProperty(pageId)) {
			const page = pages[pageId];
			const info: Extract = {
				title: page.title,
				extract: page.extract,
				thumbnail: page.thumbnail?.source,
				pronounciation: page.pageprops?.pronounciation,
			};
			return info;
		}
	}

	throw new Error(`No data available for ${topic}`);
}

export const askGeminiAI = async (question: string): Promise<string> => {
	const response = await fetch('/.netlify/functions/askGemini', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ question }),
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data: { answer: string } = await response.json();
	return data.answer;
};

export const sendResumeOverEmail = async (data: SendResumeParams): Promise<SendResumeResponse> => {
	const response = await fetch('/.netlify/functions/sendResume', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data }),
	});

	try {
		const res: SendResumeResponse = await response.json();
		if (!response.ok) {
			throw new Error(res.message);
		}
		return res;
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed likely due to empty response');
	}
};
