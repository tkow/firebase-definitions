import { firebaseScheme } from '../src/firebase-definitions'

const collections = {
  users: {
    private: {
      fuga: {},
      $ids: ['test']
    },
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
  it('scheme.collectionName completion works', () => {
    const d = firestore
      .users('id1')
      .private('test')
      .fuga('')
    expect(typeof d === 'string').toBeTruthy()
  })

  it('scheme.collectionName() can read collectionName', () => {
    const d = firestore.users('id1').private()
    expect(d).toEqual('/users/id1/private')
  })

  it('scheme.collection1("id1").collection2.$getRecordPath("id2") can create path /c1/id/c2/id', () => {
    const d = firestore.users('john').private.$getIdPath('accessary')
    expect(d).toEqual('/users/john/private/accessary')
  })
})

describe('get path storage and realtime database', () => {
  xit('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })
})
