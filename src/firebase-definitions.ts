interface OptionalInitializerParams {
  $path?: true
  $ids?: string[]
}
interface PathInitializerBase {
  [key: string]: any
}
type PathInitializer = OptionalInitializerParams & PathInitializerBase

type Empty = { [key: string]: never }

function isRecord<T extends PathInitializer>(o: PathInitializer | Empty): o is T {
  return Object.keys(o).length >= 0
}

type FirebaseSchemeResponse<O extends PathInitializer> = {
  [key in keyof O]: PathFunction<O[key]>
}

interface PathFunction<O extends PathInitializer, Path extends string = string> {
  (): string
  (path?: Path): O extends Empty ? string : FirebaseSchemeResponse<O>
  getPath(): string
}

export function firebaseScheme<T extends PathInitializer>(
  o: T | Empty,
  _path: string = ''
): T extends Empty ? Empty : FirebaseSchemeResponse<T> {
  if (isRecord<T>(o)) {
    const d = Object.keys(o) as (keyof T)[]
    return d.reduce((a, b, c) => {
      const temp = function<ID extends string>(id?: ID) {
        return id ? firebaseScheme<typeof o>(o[b], `${_path}/${b}/${id}`) : `${_path}/${b}`
      }
      temp.getPath = () => _path
      const result = {
        ...a,
        [b]: temp
      }
      return result
    }, {}) as any
  }
  return _path as any
}
