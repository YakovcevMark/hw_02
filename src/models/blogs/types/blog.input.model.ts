/**
 * @property {string} name - maxLength: 15.
 * @property {string} description - maxLength: 500.
 * @property {number} websiteUrl - maxLength: 100.
 */
export type BlogInputModel = {
    name: string
    description: string
    websiteUrl: string
}