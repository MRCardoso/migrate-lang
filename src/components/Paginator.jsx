import React, {useState} from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { PAGE_SIZE } from "../services/firebase/crud";

export default function Paginator({pager, request, response}) {
    const [paginator, setPaginator] = useState(null)
    const [loading, setLoading] = useState(false)
    const loadPages = async (prev = "0") => {
        setLoading(true)
        const onData = await request(PAGE_SIZE, paginator, prev)
        setLoading(false)
        setPaginator(onData.paginator)
		response(onData.items)
	}

    useEffect(() => {
        setPaginator(pager)
    }, [pager])

    return <>
            <div className='d-flex justify-content-end mb-2'>
                <Button disabled={loading || !paginator || (paginator && paginator.isFirst==="1")} size="sm" variant="secondary" className="mh-x2" key="prevPage" aria-label="Página anterior" onClick={() => loadPages("1")}>
                    <i className="fa fa-angle-double-left"></i>
                </Button>
                <Button disabled={loading || !paginator || (paginator && paginator.isLast==="1")} size="sm" variant="secondary" className="mh-x2" key="nextPage" aria-label="Proxíma pagina" onClick={() => loadPages("0")}>
                    <i className="fa fa-angle-double-right"></i>
                </Button>
            </div>
        </>
}