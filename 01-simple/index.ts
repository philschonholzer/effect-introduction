import { Effect } from 'effect'

const program = Effect.succeed(42)

const result = Effect.runSync(program)

console.log('Hello World', result)
