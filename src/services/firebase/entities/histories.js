import app from "../app"
import { __create, __update, __delete, __all, __one, __select, __getDocId} from "../crud"

const tableName = "histories"
const tableChapter = "chapters"

export const list = async () => {
    const response = await __all(tableName, {order: ["order", "asc"]})
    return response.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export const getChapter = async (history) => {
    const response = await __all(tableChapter, {order: ['order', 'asc'], where: ["history", "==", __getDocId(tableName, history)]})
    return response.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export const remove = (docid) => {
    return __delete(tableName, docid)
}

export const create = async (data) => {
    const lastHistory = await __one(tableName, {order: ['order', 'desc']})
    const order = ( (lastHistory.docs ? lastHistory.docs[0].data().order : 0) + 1)
    const docRef = await __create(tableName, {content: data.content, lang: data.lang, order})
    const promises = []
    data.chapters.map((chapter, index) => {
        promises.push(
            __create(tableChapter, {content: chapter.content, order: (index+1), history: __getDocId(tableName, docRef.id)})
        )
    })
    
    await Promise.all(promises)

    return Promise.resolve(docRef)
}

export default app