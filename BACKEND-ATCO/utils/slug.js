import slugify from 'slugify';

export const genearateSlug = (str = '') => {
    return slugify(str, {
        lower: true,
        replacement: '-',
    })
}