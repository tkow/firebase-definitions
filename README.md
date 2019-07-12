# Firebase Defintitions

Scheme in firebase (current: firestore only, planned: realtimedatabase and storage) can be preserved formatting json.
This libary cache path information in an object and convert the path with inputted id and path completion.

## Motivation

Regardless of string input will be easily trouble as increasingly using many times and many files by typo, missing configuration, ordered naming,
it often cause many serious problem. This library goals to prevent input string data as possible, enable auto completion, and give handy recognition
 we have what or how many collection, subcollection or storage path by collection config in one place.

### Usage

```typescript
  // ./exam[e.ts
  import {firebaseScheme} from 'firebase-definitions'

  const collections = {
    users: {
      private: {
        foo: {},
      },
      profiles: {
        posts: {}
      }
    }
  } as const

  export default firebaseScheme(collections)
```

```typescript
  // ./usege.ts

  import collections from './example'
  import firebase from 'firebase'

  // as ever we write this like firebase.firestore().collection(`users/${userId}/profiles/${profileId}`)
  // it's easily cause you mistakes like spell miss or forgetting collections.

  firebase.firestore().collection(collections.users(userId).profiles.$getPath())
  firebase.firestore().doc(collections.users(userId).profiles.$getIdPath(profile.id))

  // you can write shortly case most deep collction
  firebase.firestore().doc(collections.users(userId).profiles(profile.id).posts(post.id))

  // completion is enabled by users and profiles, you can't miss spells or invalid input unless you have mistake in first configuration.
```

### Help Wanted

I have some idea of setting union typed string literal arguments by generics (like `scheme.food(id:'orange'|'banana'|'apple')` definitions automatically or seaquenceof structure for storage or firebase
like `/assets/images/${id}` and `/assets/videos/${id}`).But, some difficult to manage typing with recurred clojure functions, if you help me, I really appreciate it.


### License

MIT