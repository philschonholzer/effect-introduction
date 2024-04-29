import { Effect, Layer } from 'effect'
import { Api } from './api'

// Implementation
const make = Effect.gen(function* () {
	// andere Services nutzen
	const api = yield* Api
	return {
		getNumber: api.getNumberFromApi,
		plusOne: (a: number) => Effect.sync(() => a + 1),
	}
})

// Eindeutigen Service mit dem Typ
export class NumberService extends Effect.Tag('@services/Number')<
	NumberService,
	Effect.Effect.Success<typeof make>
>() {
	// Implementation "exportieren". Kann aber auch als Funktion
	// geschehen. Hat nichts direkt mit der Klasse zu tun.
	static Live = Layer.effect(this, make)
}
