import { firebaseScheme } from '../src/firebase-definitions'

describe('get path firestore', () => {
  const collections = {
    users: {
      private: {
        fuga: {},
        $ids: ['test']
      },
      profiles: {
        birthDay: {}
      }
    }
  } as const

  const firestore = firebaseScheme(collections)

  it('scheme.collectionName completion works', () => {
    const d = firestore
      .users('id1')
      .private('test')
      .fuga('')
    expect(typeof d === 'string').toBeTruthy()
  })

  it('scheme.collectionName() can read collectionName', () => {
    const d = firestore.users('id1').private()
    expect(d).toEqual('users/id1/private')
  })

  it('scheme.collectionName(id).collection.$getPath() can read collectionName', () => {
    const d = firestore.users('id1').private.$getPath()
    expect(d).toEqual('users/id1/private')
  })

  it('scheme.collection1("id1").collection2.$geIdPath("id2") can create path /c1/id/c2/id', () => {
    const d = firestore.users('john').private.$getIdPath('accessary')
    expect(d).toEqual('users/john/private/accessary')
  })

  it('scheme.collection1("id1").collection2("id2").$getPath() can create path /c1/id/c2/id', () => {
    const d = firestore
      .users('john')
      .private('accessary')
      .$getPath()
    expect(d).toEqual('users/john/private/accessary')
  })

  it('scheme.collection1("id1").collection2("id2").collection3("id3") can create path /c1/id/c2/id/c3/id', () => {
    const d = firestore
      .users('john')
      .private('accessary')
      .fuga('normal')
    expect(d).toEqual('users/john/private/accessary/fuga/normal')
  })
})
