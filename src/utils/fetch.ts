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

interface GeminiAIResponse {
	answer: string;
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

export const askGeminiAI = async (question: string): Promise<GeminiAIResponse> => {
	const response = await fetch('https://api.gemini-ai.com/ask', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer YOUR_API_KEY',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ question }),
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data: GeminiAIResponse = await response.json();
	return data;
};
