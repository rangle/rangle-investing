export class User {
	userId: number;
	profileName: string;

	constructor(obj?: any) {
		this.userId = 		obj && obj.userId 		|| 0;
		this.profileName = 	obj && obj.profileName 	|| "Rangle Investor";
	}
}