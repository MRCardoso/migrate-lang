import app from "../app"
import { __create, __update, __delete, __all, __one, __select, __preparePager, responsePaginator, queryPaginator, __byId } from "../crud"

const tableName = "links"

export const list = async (limit=null, pager=null, prev="0") => {
    const params = await queryPaginator(limit, pager, prev, tableName)
    params["order"] = ["order", "asc"]
    const response = await __all(tableName, params)
    const paginator = responsePaginator(response.docs, pager, prev)
    const items = response.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return {items, paginator}
}

export default app