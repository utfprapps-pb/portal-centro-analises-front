import { api } from "@/libs/axiosBase";
import axios from "axios";
import { useEffect, useState } from "react";

function DataTable() {

    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<any>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        debugger
        api.get("/users")
            .then(response => {
                debugger;
                setPage(response.data);
            });
    }, [activePage]);

    const changePage= (index : number) => {
        setActivePage(index);
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {page.content?.map( */}
                            <tr key={'hashcode'}>
                                <td>{'id'}</td>
                                <td>{'nome'}</td>
                                <td>{'tipo'}</td>
                                <td>{'email'}</td>
                            </tr>
                        {/* )} */}

                    </tbody>
                </table>
            </div>
        </>
    );
}
export default DataTable;