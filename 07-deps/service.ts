import { Effect, Layer } from 'effect'
import { Api } from './api'

const make = Effect.gen(function* () {
	const api = yield* Api
	return {
		getNumber: () => Effect.tryPromise(api.getNumberFromApi),
		plusOne: (a: number) => Effect.sync(() => a + 1),
	}
})

export class NumberService extends Effect.Tag('@services/Number')<
	NumberService,
	Effect.Effect.Success<typeof make>
>() {
	static Live = Layer.effect(this, make)
}
