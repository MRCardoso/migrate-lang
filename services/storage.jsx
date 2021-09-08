const S_KEY_DATA = "storage-words-list";
const S_KEY_LANG = "storage-active-language";

const read = (key) => {
    if(typeof localStorage === "undefined") return null
    return localStorage.getItem(key)
}

const store = (key, value) => {
    if(typeof localStorage === "undefined") return null
    localStorage.setItem(key, value)
}

export const setWord = (note) => {
    try {
        let content = read(S_KEY_DATA)
        content = (content ? JSON.parse(content) : [])
        const newContent = [...content, note]
        store(S_KEY_DATA, JSON.stringify(newContent))
        return newContent
    } catch(e){
        return null;
    }
}

export const getWords = () =>{
    try {
        let content = read(S_KEY_DATA)
        return (content ? JSON.parse(content) : [])
    } catch (error) {
        return []
    }
}

export const removeWord = (index) => {
    const words = getWords()
    const value = words.findIndex(n=> n.toLowerCase() === index.toLowerCase())
    console.log(value, words)
    if(value !== -1){
        words.splice(value, 1)
        store(S_KEY_DATA, JSON.stringify([...words]))
        return true
    }
    return false
}

export const setLanguage = (value) => {
    store(S_KEY_LANG, value)
}

export const getLanguage = () => {
    return read(S_KEY_LANG) || 'en-US'
}

export const removeall = () => localStorage.remove