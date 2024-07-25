import data from './data.json';
import { Person } from './Person';

const jsonData: any = data;
const me: Person = Person.fromJson(jsonData);

export { me };
