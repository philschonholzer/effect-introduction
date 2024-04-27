import { Effect } from 'effect'

const number = Effect.succeed(42)
const program = Effect.map(number, (n) => `The answer is ${n}`)

const result = Effect.runSync(program)

console.log(result)
