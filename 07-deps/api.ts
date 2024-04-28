import { Context, Effect, Layer } from 'effect'

const make = {
	getNumberFromApi: Effect.tryPromise(
		() => new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000)),
	),
}

export class Api extends Context.Tag('@deps/Api')<Api, typeof make>() {
	static Live = Layer.succeed(this, make)
}
