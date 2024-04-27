import { Context, Layer } from 'effect'

const make = {
	getNumberFromApi() {
		return new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000))
	},
}

export class Api extends Context.Tag('@deps/Api')<Api, typeof make>() {
	static Live = Layer.succeed(this, make)
}
