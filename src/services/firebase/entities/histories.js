import app from "../app"
import { __create, __update, __delete, __all, __one, __select, __getDocId, queryPaginator, responsePaginator} from "../crud"

const tableName = "histories"
const tableChapter = "chapters"

export const list = async (limit=null, pager=null, prev="0") => {
    const params = await queryPaginator(limit, pager, prev, tableName)
    params["order"] = ["order", "asc"]
    const response = await __all(tableName, params)
    const paginator = responsePaginator(response.docs, pager, prev)
    const items = response.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return {items, paginator}
}

export const getChapter = async (history, limit=null, pager=null, prev="0") => {
    const params = await queryPaginator(limit, pager, prev, tableChapter)
    params.order = ['order', 'asc'] 
    params.where = ["history", "==", __getDocId(tableName, history)]
    const response = await __all(tableChapter, params)
    const paginator = responsePaginator(response.docs, pager, prev)
    const items = response.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return {items, paginator}
}

export const count = async () => {
    const response = await __all(tableName)
    return response.docs.length
}

export const countChapter = async () => {
    const response = await __all(tableChapter)
    return response.docs.length
}

export const remove = (docid) => {
    return __delete(tableName, docid)
}

export const create = async (data) => {
    const lastHistory = await __one(tableName, {order: ['order', 'desc']})
    const order = ( (lastHistory.docs ? lastHistory.docs[0].data().order : 0) + 1)
    const docRef = await __create(tableName, {content: data.content, linkRef: data.linkRef, lang: data.lang, order})
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