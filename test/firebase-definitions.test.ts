import { firebaseScheme } from '../src/firebase-definitions'

const collections = {
  users: {
    private: {
      fuga: {}
    },
    profiles: {
      birthDay: {}
    }
  }
} as const

const firestore = firebaseScheme(collections)

type UserIds = 'john' | 'josh'

describe('get path firestore', () => {
  it('scheme.collectionName() can read collectionName', () => {
    const d = firestore.users('id1').private()
    expect(d).toEqual('users/id1/private')
  })

  it('scheme.collection1("id1").collection2.$$id("id2") can create path /c1/id/c2/id', () => {
    const d = firestore.users<UserIds>('john').private.$id('accessary')
    expect(d).toEqual('users/john/private/accessary')
  })

  it('scheme.collection1("id1").collection2("id2").collection3("id3") can create path /c1/id/c2/id/c3/id', () => {
    const d = firestore
      .users('john')
      .private('accessary')
      .fuga('normal')
    expect(d).toEqual('users/john/private/accessary/fuga/normal')
    const e = firestore
      .users('john')
      .private('accessary')
      .fuga.$id('normal')
    expect(e).toEqual('users/john/private/accessary/fuga/normal')
  })
})
