interface OptionalInitializerParams {
  $path?: true
  $ids?: string[]
}
interface PathInitializerBase {
  [key: string]: PathInitializer
}

type PathInitializer = OptionalInitializerParams & PathInitializerBase

const a = {
  path: {
    subpath: {
      s: {}
    }
  }
}

interface Fu<O extends PathInitializer> {
  <T extends string>(path?: T): typeof path extends undefined ? string : ReturnType<Fa<O>>
}

interface Fa<O extends PathInitializer> {
  (o: O, _path: string): O extends object ? { [s in keyof O]: Fu<O[keyof O]> } : string
}

function fa<O extends PathInitializer>(o: O, _path: string): ReturnType<Fa<O>> {
  const d = Object.keys(o) as (keyof O)[]
  if (d.length) {
    return d.reduce((a, b, c) => {
      const func = (id?: string) => (id ? fa(o[b], `${_path}/${b}/${id}`) : `${_path}/${b}`)
      func.getPath = () => _path
      return {
        ...a,
        [b]: func
      }
    }, {}) as ReturnType<Fa<O>>
  }
  return 'test' as ReturnType<Fa<O>>
}

const z = fa(a, '')
const d = z
  .path()
  .subpath()
  .s()
d.ffa = 'test'

// const dd = Object.keys(a).reduce((current,_key)=>{
//   // tslint:disable-next-line:no-unused-expression
//   const fafa = Object.keys(a)
//   a[fafa[0]]
//   return {
//     ...current,
//     [_key]:(_a?:string) => {
//       const result = _key+_a!
//       if(!( a[_key])) return
//       return Object.keys(a[key]).reduce((current,key)=>{
//         return {
//           [key]: 'test'
//         }
//       },{})
//     }
//   }
// },{})

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
