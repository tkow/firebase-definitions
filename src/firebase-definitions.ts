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
  [key in keyof O]: PathFunction<
    O[key],
    O['$ids'] extends readonly any[] ? any : O extends { $ids?: readonly any[] } ? any : string
  >
}

interface PathFunction<O extends PathInitializer, Path extends string = string> {
  (): string
  (path?: Path): O extends Empty
    ? string
    : FirebaseSchemeResponse<O> & { $getPath<ID extends string>(id?: ID): string }
  $getIdPath<ID extends string>(id: ID): string
  $getPath(): string
}

export function firebaseScheme<T extends PathInitializer>(
  o: T | Empty,
  _path: string = ''
): T extends Empty ? Empty : FirebaseSchemeResponse<T> {
  if (isRecord<T>(o)) {
    const d = Object.keys(o) as (keyof T)[]
    return d.reduce((a, b, c) => {
      const parentPath = [_path, b].filter(Boolean).join('/')
      const temp = function<ID extends string>(id?: ID) {
        return id ? firebaseScheme<typeof o>(o[b], `${parentPath}/${id}`) : `${parentPath}`
      }
      temp.$getIdPath = <ID extends string>(id: ID) => `${parentPath}/${id}`
      temp.$getPath = () => `${parentPath}`
      const result = {
        ...a,
        [b]: temp,
        $getPath<ID extends string>(id?: ID): string {
          if (!id) return _path
          return `${_path}/${id}`
        }
      }
      return result
    }, {}) as any
  }
  return _path as any
}
