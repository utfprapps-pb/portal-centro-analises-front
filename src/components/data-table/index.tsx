import { api } from "@/libs/axiosBase";
import { CustomButton } from '../custom-button';
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
        api.get("/users")
            .then(response => {
                const data = response.data;
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
                                <td><CustomButton
                                    text="Selecionar"
                                    padding="0.5rem"
                                    textColor="white"
                                    backgroundColor="#006dac"
                                    textColorHover="white"
                                    backgroundColorHover="#00bbff"
                                    letterSpacing="4px"
                                    fontSize="12px"
                                    fontWeight="200"
                                    type="submit"
                                /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const handleClick = (item) => {
    // Handle button click logic here
    console.log('ronaldinho ' + item);
  };

export default DataTable;
