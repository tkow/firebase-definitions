interface OptionalInitializerParams {
  $path?: true
  $ids?: string[]
}
interface PathInitializerBase {
  [key: string]: PathInitializer
}

type PathInitializer = OptionalInitializerParams & PathInitializerBase

type DDD<O> = {
  [key in keyof O]?: PathInitializer
}

type Z<ZX> = DDD<ZX> & OptionalInitializerParams

type C<D> = {
  [s in keyof D]: PathInitializer
}

type F = C<PathInitializer>

const a = {
  path: {
    subpath: {}
  }
}

Object.keys(a).reduce((current, key) => {
  return
}, {})

type c = {
  path: <A>(
    path: keyof A
  ) => {
    subPath: <B>(path: keyof B) => string
  }
}

const b = new A({ a: {} })

//   const collections = {
//     'users': {

//     },
//     'profiles': {

//     },
//     'rooms': {
//       "messages": {}
//     },
//     'companyActivities': {
//       'scoutLogs':{

//       },
//       'toUserPermissions': {

//       }
//     },
//     'companyUserProfiles': {
//     },
//     'companies': {},
//     'offers': {},
//     'permissions':{

//     },
//     'templates': {
//     }
// c}
