import { CSSProperties } from 'react';

declare module 'react' {
	interface CSSProperties {
		'--fa-animation-iteration-count'?: number;
	}
}
