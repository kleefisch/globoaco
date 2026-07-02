type SlugValue = {
  current?: string
}

type ValidationClient = {
  fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
}

type SlugValidationContext = {
  document?: {
    _id?: string
  }
  getClient?: (options: {apiVersion: string}) => ValidationClient
}

const apiVersion = '2024-03-30'

export function uniqueRouteSlug(types: string[], routeLabel: string) {
  return async (value: SlugValue | undefined, context: SlugValidationContext) => {
    const slug = value?.current
    const client = context.getClient?.({apiVersion})
    const rawId = context.document?._id

    if (!slug || !client || !rawId) return true

    const publishedId = rawId.replace(/^drafts\./, '')
    const draftId = `drafts.${publishedId}`

    const collision = await client.fetch<{_type: string; title?: string; name?: string} | null>(
      `*[
        _type in $types &&
        slug.current == $slug &&
        !(_id in [$publishedId, $draftId])
      ][0]{
        _type,
        "title": coalesce(title, name)
      }`,
      {types, slug, publishedId, draftId},
    )

    if (!collision) return true

    const label = collision.title ? ` (${collision.title})` : ''
    return `Slug já usado em ${routeLabel} por um documento do tipo ${collision._type}${label}. Use outro slug para evitar conflito de URL pública.`
  }
}
