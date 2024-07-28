import { hslToRgb, rgbToHex } from '@mui/material';
import { EducationDetails } from '@types';

export async function* fillGenerator(
	text: string,
	seconds: number = 2,
): AsyncGenerator<{ text: string; done: boolean }> {
	const timeout = (seconds * 1000) / text.length;

	for (let i = 1; i <= text.length; i++) {
		yield { text: text.slice(0, i), done: false };
		await new Promise((resolve) => setTimeout(resolve, timeout));
	}
	yield { text, done: true };
}

/**
 * This function divides value1 into equal number of sections and returns the index (0 index) position of
 * the section in which value2 will lie.
 * @param value1 The value to compare with
 * @param value2 The value to compare
 * @param dividend Total number of sections
 */
export function getSectionPosition(value1: number, value2: number, sections: number): number | null {
	const sectionSize = value2 / sections;
	for (let i = 0; i < sections; i++) {
		if (value1 <= sectionSize * (i + 1)) {
			return i;
		}
	}
	return null;
}

export function isObject(value: any): boolean {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

interface CssVarsFromObjectProps {
	object: Record<string, any>;
	prefix?: string;
	include?: Array<string>;
	exclude?: Array<string>;
	type?: 'hsl' | 'hex' | 'rgb';
}

export function getCssVarsFromObject({
	object,
	prefix = 'mui',
	include = [],
	exclude = [],
	type = 'hex',
}: CssVarsFromObjectProps): Array<Record<string, string | number>> {
	const keyValueArray: Array<Record<string, string | number>> = [];

	function recurse(obj: Record<string, any>, currentPath: string[] = []): void {
		for (const [key, value] of Object.entries(obj)) {
			const newPath = [...currentPath, key];
			if (isObject(value)) {
				recurse(value, newPath);
			} else if (typeof value === 'string' || typeof value === 'number') {
				const pathString = newPath.join('-');
				const shouldInclude = include.length === 0 || include.some((item) => pathString.includes(item));
				const shouldExclude = exclude.some((item) => pathString.includes(item));

				if (shouldInclude && !shouldExclude) {
					let finalValue: string | number = value;
					if (typeof value === 'string' && value.startsWith('hsl')) {
						if (type === 'rgb') finalValue = hslToRgb(value);
						if (type === 'hex') finalValue = rgbToHex(hslToRgb(value));
					}
					keyValueArray.push({ [`--${prefix}-${pathString}`]: finalValue });
				}
			}
		}
	}

	recurse(object);
	return keyValueArray;
}

export function convertColorToHex(color: string): string {
	if (color.startsWith('#')) {
		return color;
	} else if (color.startsWith('hsl')) {
		return convertColorToHex(hslToRgb(color));
	} else if (color.startsWith('rgb')) {
		return rgbToHex(color);
	} else throw new Error('Color type not compatible');
}

export function truncate(text: string, limit: number): string {
	return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

export function hyphenToCapital(phrase: string): string {
	return phrase
		.trim()
		.split('-')
		.map((item: string) => item[0].toUpperCase() + item.slice(1, item.length))
		.join(' ');
}

export function isColorDark(color: string): boolean {
	const rgb = color.match(/\d+/g);
	if (!rgb) return false;
	const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
	return brightness < 128;
}

export function getGrade(grade: EducationDetails['grade']): string {
	if (grade?.grade === undefined) return '';
	const type = grade.type === 'Percentage' ? '%' : ' CGPA';
	return `${grade.grade}${type}`;
}
