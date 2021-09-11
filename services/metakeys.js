export const appName = "Migre para o inglês"

export const keywords = (extraKeys = []) => {
    keys = ["fala", "falar", "inglês", "de graça", "praticar", "tradução", "língua", "pronuncia", "comunidade"];
    keys = keys.concat(extraKeys)
    return keys.join(', ')
}

export const canonicalName = (path = '') => {
    return `https://migrate-lang.vercel.app/${path || ''}`
}
