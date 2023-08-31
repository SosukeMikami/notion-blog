export const getPageLink = (page: number, tag?: string) => {
    return tag ? `/posts/tag/${tag}/page/${page}` : `/page/${page}`
}