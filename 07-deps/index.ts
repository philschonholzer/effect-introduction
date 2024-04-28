import { Console, Effect, Layer } from 'effect'
import { NumberService } from './service'
import { Api } from './api'
import type { UnknownException } from 'effect/Cause'

const program = Effect.gen(function* () {
	yield* Console.log('Starting program...')

	const number = yield* NumberService.getNumber

	const addedUpNumber = yield* NumberService.plusOne(number)

	return `The answer is ${addedUpNumber}`
})

runProgram(program).then(console.log)

//
//
// Infrastructure

function runProgram(
	program: Effect.Effect<string, UnknownException, NumberService>,
) {
	const runnable = provideDependencies(program)
	return Effect.runPromise(runnable)
}

function provideDependencies(
	program: Effect.Effect<string, UnknownException, NumberService>,
) {
	const mainLayer = Layer.provide(NumberService.Live, Api.Live)

	const runnable = Effect.provide(program, mainLayer)
	return runnable
}
