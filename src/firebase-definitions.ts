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
  return Object.keys(o).length > 0
}

type FirebaseSchemeResponse<O extends PathInitializer> = {
  [key in keyof O]: PathFunction<
    O[key],
    // TODO: idsのstring[]からUnionTypeを型推論したい
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
    return d.reduce((collectionGenerators, collectionName, _) => {
      const parentPath = [_path, collectionName].filter(Boolean).join('/')
      const generator = function<ID extends string>(id?: ID) {
        return id
          ? firebaseScheme<typeof o>(o[collectionName], `${parentPath}/${id}`)
          : `${parentPath}`
      }
      generator.$getIdPath = <ID extends string>(id: ID) => `${parentPath}/${id}`
      generator.$getPath = () => `${parentPath}`
      const result = {
        ...collectionGenerators,
        [collectionName]: generator,
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
