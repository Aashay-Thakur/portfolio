import { EducationDetails } from '@types';

export interface EducationParams {
	degree: string;
	degreeShort: string;
	branch: string;
	institute: string;
	instituteShort: string;
	startYear?: number;
	endYear: number;
	grade?: number | string;
	gradeOutof?: number | string;
	gradeType?: GradeType;
}

interface DegreeDetails {
	full: string;
	short: string;
	branch: string;
}

type GradeType = 'CGPA' | 'Percentage' | undefined;

interface InstituteDetails {
	full: string;
	short: string;
}

class Education {
	private _degree: string;
	private _degreeShort: string;
	private _branch: string;
	private _institute: string;
	private _instituteShort: string;
	private _startYear?: number;
	private _endYear: number;
	private _grade?: number | string;
	private _gradeOutof?: number | string;
	private _gradeType?: GradeType;
	private _status: string;

	constructor(params: EducationParams) {
		const {
			degree,
			degreeShort,
			branch,
			institute,
			instituteShort,
			startYear,
			endYear,
			grade,
			gradeOutof,
			gradeType,
		} = params;

		if (!degree || !degreeShort || !branch || !institute || !instituteShort || !endYear) {
			throw new Error('Invalid data provided to Education constructor');
		}

		this._degree = degree;
		this._degreeShort = degreeShort;
		this._branch = branch;
		this._institute = institute;
		this._instituteShort = instituteShort;
		this._startYear = startYear;
		this._endYear = endYear;
		this._grade = grade;
		this._gradeOutof = gradeOutof;
		this._gradeType = gradeType;
		this._status = Education.educationStatus(this._startYear, this._endYear);
	}

	static educationStatus(startYear: number = new Date().getFullYear(), endYear: number): string {
		const currentYear = new Date().getFullYear();
		if (currentYear < startYear) {
			return 'Yet to start';
		} else if (currentYear > endYear) {
			return 'Completed';
		} else {
			return 'In Progress';
		}
	}

	get degree(): DegreeDetails {
		return {
			full: this._degree,
			short: this._degreeShort,
			branch: this._branch,
		};
	}

	get status(): string {
		return this._status;
	}

	get institute(): InstituteDetails {
		return {
			full: this._institute,
			short: this._instituteShort,
		};
	}

	get duration(): number | undefined {
		return this._startYear ? this._endYear - this._startYear : undefined;
	}

	get endYear(): number {
		return this._endYear;
	}

	get grade(): EducationDetails['grade'] {
		return {
			grade: this._grade,
			outOf: this._gradeOutof,
			type: this._gradeType,
		};
	}

	get education(): EducationDetails {
		return {
			degree: this.degree,
			grade: this.grade,
			status: this.status,
			institute: this.institute,
			duration: this.duration,
			endYear: this.endYear,
		};
	}
}

export { Education };
