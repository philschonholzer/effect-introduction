import { Effect } from 'effect'

// Dies entspricht vereinfacht etwa
// const program = () => 42
const program = Effect.succeed(42)

// Effects müssen ausgeführt werden, um den Wert zu erhalten
const result = Effect.runSync(program)

console.log('Hello World', result)
