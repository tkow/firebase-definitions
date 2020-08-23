export type OptionalInitializerParams = {
  [key: string]: OptionalInitializerParams | any
  $ids?: string[]
}

type Empty = { [key: string]: never }

function isRecord<T extends OptionalInitializerParams>(o: T | Empty): o is T {
  return Object.keys(o).length > 0
}

export type FirebaseSchemeResponse<O extends OptionalInitializerParams> = {
  [key in keyof O]: PathFunction<O[key]>
}

export interface PathFunction<O extends OptionalInitializerParams> {
  (): string
  <Path extends string = string>(path?: Path): O extends Empty ? string : FirebaseSchemeResponse<O>
  $id<ID extends string>(id: ID): string
}

export function firebaseScheme<T extends OptionalInitializerParams>(
  o: T | Empty,
  _path: string = ''
): T extends Empty ? Empty : FirebaseSchemeResponse<T> {
  if (isRecord<T>(o)) {
    const d = Object.keys(o) as (keyof T)[]
    return d.reduce((collectionGenerators, collectionName, _) => {
      const parentPath = [_path, collectionName].filter(Boolean).join('/')
      const generator = function<ID extends string>(id?: ID) {
        return id
          ? firebaseScheme(o[collectionName] as any, `${parentPath}/${id}`)
          : `${parentPath}`
      }
      const $id = <ID = typeof o['$ids'] extends string[] ? typeof o['$ids'][number] : string>(
        id: ID
      ) => `${parentPath}/${id}`
      generator.$id = $id
      const result = {
        ...collectionGenerators,
        [collectionName]: generator
      }
      return result
    }, {}) as any
  }
  return _path as any
}
