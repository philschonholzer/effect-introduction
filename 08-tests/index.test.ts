import { describe, expect, it } from 'bun:test'
import { Api } from './api'
import { NumberService } from './service'
import { Effect, Layer } from 'effect'
import { UnknownException } from 'effect/Cause'

describe('NumberService.getNumber', () => {
	it('gets a number', async () =>
		Effect.gen(function* () {
			const number = yield* NumberService.getNumber
			expect(number).toBe(1)
		}).pipe(runTest({ rejects: false })))

	it('rejects', async () =>
		Effect.gen(function* () {
			const number = yield* NumberService.getNumber.pipe(Effect.flip)
			expect(number).toBeInstanceOf(UnknownException)
		}).pipe(runTest({ rejects: true })))
})

const runTest =
	(params: Parameters<typeof Api.Test>[0]) =>
	(effect: Effect.Effect<unknown, unknown, NumberService>) => {
		const mainTest = Layer.provide(
			NumberService.Live,
			Api.Test({ rejects: params?.rejects }),
		)
		return effect.pipe(Effect.provide(mainTest), Effect.runPromise)
	}
