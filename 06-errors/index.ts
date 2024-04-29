import { Console, Data, Effect } from 'effect'

const program = Effect.gen(function* () {
	yield* Console.log('Starting program... 50/50 chance of error...')

	const number = yield* getNumber() /* .pipe(Effect.retry({ times: 3 })) */

	const addedUpNumber = plusOne(number)

	return `The answer is ${addedUpNumber}`
}) /* .pipe(
	Effect.catchTag('NumberNotFound', (e) =>
		Effect.succeed(
			`Could not get the number. Give you 42 instead. Error: ${e.message}`,
		),
	),
) */

Effect.runPromise(program).then(console.log)

// Domain functions

function getNumber() {
	return Effect.tryPromise({
		try: getNumberFromApi,
		catch: () =>
			new NumberNotFoundError({
				message: 'The answer to the universe is currently not available.',
			}),
	})
}

function plusOne(a: number) {
	return a + 1
}

// API

function getNumberFromApi() {
	return new Promise<number>((resolve, reject) =>
		setTimeout(
			() => (Math.random() > 0.5 ? resolve(42) : reject('number not found')),
			1000,
		),
	)
}

class NumberNotFoundError extends Data.TaggedError('NumberNotFound')<{
	message: string
}> {}
