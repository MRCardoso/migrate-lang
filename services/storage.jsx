const S_KEY_DATA = "storage-words-list";
const S_KEY_ARTICLE = "storage-articles";
const S_KEY_LANG = "storage-active-language";

const dataKey = (state) => {
    const lang = getLanguage().toLowerCase()
    return `${state}-${lang}`
}
const read = (key) => {
    if(typeof localStorage === "undefined") return null
    return localStorage.getItem(key)
}

const store = (key, value) => {
    if(typeof localStorage === "undefined") return null
    localStorage.setItem(key, value)
}

const saveJson = (key, value) => {
    let content = read(key)
    content = (content ? JSON.parse(content) : [])
    const newContent = [...content, value]
    store(key, JSON.stringify(newContent))
    return newContent
}

export const setArticle = (data) => {
    try {
        const key = dataKey(S_KEY_ARTICLE)
        return saveJson(key, data)
    } catch(e){
        return null;
    }
}

export const getArticles = () =>{
    try {
        let content = read(dataKey(S_KEY_ARTICLE))
        return (content ? JSON.parse(content) : [])
    } catch (error) {
        return []
    }
}

export const removeArticle = (index) => {
    const articles = getArticles()
    const value = articles.findIndex(n=> n.id === index)
    
    if(value !== -1){
        articles.splice(value, 1)
        store(dataKey(S_KEY_ARTICLE), JSON.stringify([...articles]))
        return true
    }
    return false
}

export const setWord = (note) => {
    try {
        const key = dataKey(S_KEY_DATA)
        return saveJson(key, note)
    } catch(e){
        return null;
    }
}

export const getWords = () =>{
    try {
        let content = read(dataKey(S_KEY_DATA))
        return (content ? JSON.parse(content) : [])
    } catch (error) {
        return []
    }
}

export const removeWord = (index) => {
    const words = getWords()
    const value = words.findIndex(n=> n.toLowerCase() === index.toLowerCase())

    if(value !== -1){
        words.splice(value, 1)
        store(dataKey(S_KEY_DATA), JSON.stringify([...words]))
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

export const getLanguageLabel = () =>{
    const lang = getLanguage().toLowerCase()
    const available = {
        'en-ca': 'Inglês(CA)', 
        'en-us': 'Inglês', 
        'pt-br': 'Português', 
        'fr-ca': 'Francês'
    }
    return available[lang] || 'idioma'
}

export const getDateFromValue = (value) => {
    const list = value.split(' ')
    if(list.length !== 3){
        console.log('#0')
        return null;
    }
    let [month, day, year] = list
    month = String(month).toLowerCase()
    day = parseInt(String(day).replace(/[^0-9]/ig, ''))
    const currentYear = (new Date()).getFullYear() - 20
    const available = { 
        'en-us': ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"], 
        'pt-br': ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    }
    const lang = getLanguage().toLowerCase()
    
    if (year < currentYear || year > 3000){
        console.log('#1')
        return null
    }

    if(!available[lang]) {
        console.log('#2')
        return null;
    }

    const index = available[lang].indexOf(month)
    if( index === -1 ){
        console.log('#3')
        return null
    }
    const months = available[lang]
    const thirtyOne = [months[0], months[2], months[4], months[6], months[7], months[9], months[11]]
    const isThirdyOne = thirtyOne.indexOf(month) !== -1
    const isFeb = month === months[1]
    const validThirdyOne = day === 31 && isThirdyOne
    const validThirdy = day <= 30
    const validFebruary = isFeb && day <= 28
    const validLeap = day === 29 && isFeb && ( (year%400 == 0) || (year%4==0 && year%100!=0) )

    if(day >= 1 && (validThirdyOne || validThirdy || validFebruary || validLeap) ){
        return `${month}, ${day < 10 ? '0': ''}${day}, ${year}`
    }
    console.log('#4')
    return null
}

export const removeall = () => localStorage.remove