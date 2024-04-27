import { Console, Data, Effect } from 'effect'

const program = Effect.gen(function* () {
	yield* Console.log('Starting program...')

	const number = yield* getNumber()

	const addedUpNumber = plusOne(number)

	return `The answer is ${addedUpNumber}`
}) /* .pipe(
	Effect.catchTag('NumberNotFound', (e) =>
		Effect.succeed(
			`Could not get the number. Give you 42 instead. Error: ${e.message}`,
		),
	),
) */

/* .pipe(
	Effect.catchAllDefect((error) =>
		Effect.succeed(
			`Could not get the number. Give you 42 instead. Error: ${error}`,
		),
	),
) */

Effect.runPromise(program).then(console.log)

//
//
//
//
// Functions

function getNumber() {
	return Effect.promise(getNumberFromApi)

	// return Effect.tryPromise({
	// 	try: getNumberFromApi,
	// 	catch: () =>
	// 		new NumberNotFoundError({
	// 			message: 'The answer to the universe is currently not available.',
	// 		}),
	// })
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
	return new Promise<number>((resolve, reject) =>
		setTimeout(
			() => (Math.random() > 0.6 ? resolve(42) : reject('number not found')),
			1000,
		),
	)
}

class NumberNotFoundError extends Data.TaggedError('NumberNotFound')<{
	message: string
}> {}
