import { firebaseScheme } from '../src/firebase-definitions'

const collections = {
  users: {
    private: {},
    profiles: {
      d: ''
    }
  }
} as const

const firestore = firebaseScheme(collections)

/**
 * Dummy test
 */
describe('get path firestore', () => {
  it("scheme.collection('Id') works", () => {
    const d = firestore
      .users('id1')
      .profiles('')
      .d('')
    expect(true).toBeTruthy()
  })

  xit('scheme.collection() works', () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })

  xit('scheme.collection.getPath() works', () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })
})

describe('get path storage and realtime database', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  xit('DummyClass is instantiable', () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })
})
