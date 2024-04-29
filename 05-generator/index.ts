import { Console, Effect } from 'effect'

const program = Effect.gen(function* () {
	yield* Console.log('Starting program...')

	const number = yield* getNumber()

	const addedUpNumber = plusOne(number)

	return `The answer is ${addedUpNumber}`
})

Effect.runPromise(program).then(console.log)

// Domain functions

function getNumber() {
	return Effect.promise(getNumberFromApi)
}

function plusOne(a: number) {
	return a + 1
}

// API

function getNumberFromApi() {
	return new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000))
}
