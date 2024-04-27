import { Context, Layer } from 'effect'

const make = {
	getNumberFromApi() {
		return new Promise<number>((resolve) => setTimeout(() => resolve(42), 1000))
	},
}

const makeTest = (props: { rejects: boolean }) => ({
	getNumberFromApi() {
		return props.rejects === true ? Promise.reject('boom') : Promise.resolve(1)
	},
})

export class Api extends Context.Tag('@deps/Api')<Api, typeof make>() {
	static Live = Layer.succeed(this, make)
	static Test = (props: Parameters<typeof makeTest>[0]) =>
		Layer.succeed(this, makeTest(props))
}
