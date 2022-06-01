export function getSlug( title ) {
    return title.toLowerCase().split(' ').join('-');
}