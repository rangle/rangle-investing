export class AccountBalance {
	userId: number;
	balance: number;

	constructor(obj?: any) {
		this.userId = 	obj && obj.userId 	|| 0;
		this.balance = 	obj && obj.balance 	|| 0;
	}
}