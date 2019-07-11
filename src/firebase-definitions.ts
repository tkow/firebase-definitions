
  interface OptionalInitializerParams {
    "$path"?: true
    "$ids"?: string[]
  }
  interface PathInitializerBase  {
    [key: string]: PathInitializer
  }

  type PathInitializer =  OptionalInitializerParams & PathInitializerBase

  const collections = {
    'users': {

    },
    'profiles': {

    },
    'rooms': {
      "messages": {}
    },
    'companyActivities': {
      'scoutLogs':{

      },
      'toUserPermissions': {

      }
    },
    'companyUserProfiles': {
    },
    'companies': {},
    'offers': {},
    'permissions':{

    },
    'templates': {
    }
c}
