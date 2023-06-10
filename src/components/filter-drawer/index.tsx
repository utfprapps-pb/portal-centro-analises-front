import { Box, Button, Divider, Drawer, Input, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";

import FilterIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@mui/material/IconButton';
import { Filter } from "./filter";

import styles from "./styles.module.css"

export function FilterDrawer() {
    const list = [
        { label: "Id", value: 'id' },
        { label: "Nome", value: 'name' },
        { label: "Descrição", value: 'description' }
    ];

    const operations = [
        { label: "Igual", value: ':' },
        { label: "Diferente", value: '!' },
        { label: "Maior", value: '>' },
        { label: "Menor", value: '<' },
        { label: "Contém", value: '~' },
        { label: "Data", value: '-' }
    ];

    let filters: Filter[] = [];

    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState(list);
    const [filterlist, setFilterList] = useState(filters);
    const [search, setSearch] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (item: any) => () => {
        const updatedFilterList = JSON.parse(JSON.stringify(filterlist));
        updatedFilterList.push({
            field: item,
            operation: ':',
            value: ''
        })
        setFilterList(updatedFilterList);
    }

    const handleOperationChange = (index: number) => (event: any) => {
        const updatedFilterList = filterlist.map((value, i) => {
            if (i === index) {
                value.operation = event.target.value;
                return value
            } else {
                return value
            }
        })
        setFilterList(updatedFilterList);
    };

    const handleValueChange = (index: any) => (e: any) => {
        const updatedFilterList = filterlist.map((value, i) => {
            if (i === index) {
                value.value = e.target.value;
                return value
            } else {
                return value
            }
        })
        setFilterList(updatedFilterList);
    };

    const handleConfirm = () => {
        console.log(filterlist)
        if (filterlist && filterlist.length) {
            setSearch(filterlist.map(item => item.field.value + item.operation + item.value).join(","))
            console.log(filterlist.map(item => item.field.value + item.operation + item.value).join(","))
        }
        handleClose()
    };

    const handleClean = () => {
        filters = [];
        setFilterList([]);
        setSearch('');
    }

    const handleRemove = (item: any, index: number) => () => {
        filterlist.splice(index, 1)
    }

    return (
        <div>
            <IconButton aria-label="filter" onClick={handleClickOpen}
                color='primary'
                size='large'>
                <FilterIcon fontSize='large' />
            </IconButton>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={handleClose}
            >
                <div className={styles.drawer}>
                    <Typography variant="h6" component="div" className={styles.title}>
                        Filtros
                    </Typography>
                    <Box>
                        <List>
                            {
                                fields?.map((field, index) => (
                                    <ListItem className={styles.item} key={index}>
                                        <ListItemText
                                            primary={field.label}
                                        />
                                        <IconButton aria-label="add" onClick={handleAdd(field)} key={index}
                                            color='default'
                                            size='medium'>
                                            <AddIcon key={index} />
                                        </IconButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    <Divider variant="middle" />
                    {
                        filterlist.map((filter, index) => (
                            <Box className={styles.box_filtro} key={index}>
                                <div className={styles.filtro_subtitle} key={index}>
                                    <Typography variant="body1" key={index}>
                                        {filter?.field?.label}
                                    </Typography>
                                </div>
                                <div className={styles.flex_row} key={index}>
                                    <div className={styles.flex_column} key={index}>
                                        <InputLabel htmlFor="operation" key={index}>Comparação</InputLabel>
                                        <Select key={index}
                                            autoFocus
                                            value={filterlist[index].operation}
                                            onChange={handleOperationChange(index)}
                                            label="operation"
                                        >
                                            {operations.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className={styles.flex_column} key={index}>
                                        <TextField key={index}
                                            id="value"
                                            label="Valor" value={filterlist[index].value}
                                            defaultValue="" onChange={handleValueChange(index)}
                                        />
                                    </div>
                                    <IconButton aria-label="delete" onClick={handleRemove(filterlist[index].value, index)} key={index}
                                        color='default'
                                        size='medium'>
                                        <DeleteIcon key={index} />
                                    </IconButton>
                                </div>
                            </Box>
                        ))
                    }
                    <div className={styles.buttons}>
                        <Button onClick={handleClean}>Limpar</Button>
                        <Button onClick={handleConfirm}>Confirmar</Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}