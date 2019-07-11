interface OptionalInitializerParams {
  $path?: true
  $ids?: string[]
}
interface PathInitializerBase {
  [key: string]: PathInitializer
}
type PathInitializer = OptionalInitializerParams & PathInitializerBase

interface PathFunction<O extends PathInitializer> {
  (): string
  (path?: string): O extends Empty ? string : ReturnType<FirebaseScheme<O>>
  getPath(): string
}

type Empty = { [key: string]: never }

interface FirebaseScheme<O extends PathInitializer> {
  (o: O, _path: string): O extends Empty ? string : { [key in keyof O]: PathFunction<O[keyof O]> }
}

function isRecord(o: PathInitializer | Empty): o is PathInitializer {
  return Object.keys(o).length >= 0
}

type FirebaseSchemeResponse<O extends PathInitializer> = {
  [key in keyof O]: PathFunction<O[keyof O]>
}

export function firebaseScheme<T extends PathInitializer>(
  o: T | Empty,
  _path: string = ''
): typeof o extends Empty ? string : FirebaseSchemeResponse<T> {
  const d = Object.keys(o) as (keyof T)[]
  if (isRecord(o)) {
    return d.reduce((a, b, c) => {
      const temp = (id?: typeof o['$ids'] extends string[] ? typeof o['$ids'] : string[]) => {
        return id ? firebaseScheme(o[b], `${_path}/${b}/${id}`) : `${_path}/${b}`
      }
      temp.getPath = () => _path
      return {
        ...a,
        [b]: temp
      }
    }, {}) as any
  }
  return _path as any
}
