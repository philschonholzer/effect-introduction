import { Effect } from 'effect'

console.log('Starting program...')

const number = getNumber()
const addedUpNumber = Effect.map(number, (n) => n + 1)
const program = Effect.map(addedUpNumber, (n) => `The answer is ${n}`)

Effect.runPromise(program).then(console.log)

//
//
//
//
// Functions

function getNumber() {
	return Effect.promise(getNumberFromApi)
}

//
//
//
//
// API

function getNumberFromApi() {
	return new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000))
}
