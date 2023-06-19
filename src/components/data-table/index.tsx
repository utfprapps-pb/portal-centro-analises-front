import { api } from "@/libs/axiosBase";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function DataTable() {
    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<any>({
        content: [],
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
                const data = response.data;
                debugger;
                setPage(state => ({
                    ...state,
                    content: data
                }));
            })
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    return (
        <>
            <div className="table-responsive">
                <table className={styles.tableAdmin}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Email</th>
                            <th>Seleção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>{item.email}</td>
                                <td><button>Selecionar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
