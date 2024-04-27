import { Console, Effect, pipe } from 'effect'

const program = pipe(
	Console.log('Starting program...'),
	Effect.flatMap(getNumber),
	Effect.map(plusOne),
	Effect.map((n) => `The answer is ${n}`),
)

Effect.runPromise(program).then(console.log)

//
//
//
//
// Functions

function getNumber() {
	return Effect.promise(getNumberFromApi)
}

function plusOne(a: number) {
	return a + 1
}

//
//
//
//
// API

function getNumberFromApi() {
	return new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000))
}
