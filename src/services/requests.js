import axios from "axios";

export const apiUri = process.env.NEXT_PUBLIC_API_URI

export const pixabayUri = (query, limit = 10, page=1, type = 'photo') =>{
    return `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&q=${query}&image_type=${type}&page=${page}&per_page=${limit}`
}

export const requestTranslate = (lang, texts) => {
    return new Promise((resolve, reject) => {
        const language = lang.split('-')[0].toLowerCase()
        const [origin, trans] = (language === 'pt' ? ['pt', 'en'] : ['en', 'pt'])
        const phrases = texts.reduce((acc, value) => {
            if(value && value.trim() !== "")
                acc.push({text: value, origin, trans})
            return acc
        }, [])
        
        if(phrases.length !== texts.length){
            reject("Há campos não preenchdos, corriga antes de traduzir.")
            return 
        }
        axios
        .create({
            baseURL: apiUri,
            headers: {"X-Api-Key": process.env.NEXT_PUBLIC_API_KEY}
        })
        .post('/translate', {phrases})
        .then(response => {
            if('errors' in response.data){
                reject(response.data.errors)
                return
            }
            const translates = {} 
            phrases.map(c => {
                if (response.data[c.text])
                    translates[c.text] = response.data[c.text]
            })
            resolve(translates)
        })
        .catch(reject)
    })
}