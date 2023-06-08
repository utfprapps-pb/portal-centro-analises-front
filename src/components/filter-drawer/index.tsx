import { Box, Button, Divider, Drawer, Input, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@material-ui/core";
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
        {label:"Id",value:'id'},
        {label:"Nome",value:'name'},
        {label:"Descrição",value:'description'}
    ];

    const operations = [
        {label:"Igual",value:':'},
        {label:"Diferente",value:'!'},
        {label:"Maior",value:'>'},
        {label:"Menor",value:'<'},
        {label:"Contém",value:'~'},
        {label:"Data",value:'-'}
    ];

    let filters:Filter[] = [];

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
        console.log('add',item)
        
        filterlist.push({
            field:item,
            operation:':',
            value:''
        })
        setFilterList(filterlist);
    }

    const handleOperationChange = ( index:number) => (event:any) => {
        console.log('event',event.target.value)
        console.log('index',index)
        filterlist[index].operation = event.target.value
        setFilterList(filterlist);
    };

    const handleValueChange = (index:number) => (event:any) => {
        console.log('event',event.target.value)
        console.log('index',index)
        filterlist[index].value = event.target.value
        setFilterList(filterlist);
    };

    const handleConfirm = () => {
        console.log(filterlist)
        if(filterlist && filterlist.length){
            setSearch(filterlist.map(item => item.field.value+item.operation+item.value).join(","))
            console.log(filterlist.map(item => item.field.value+item.operation+item.value).join(","))
        }
        handleClose()
    };

    const handleClean = () => {
        filters = [];
        setFilterList([]);
        setSearch('');
    }

    const handleRemove = (item:any, index:number) => () => {
        filterlist.splice(index,1)
    }

    return (
        <div>
            <IconButton aria-label="filter" onClick={handleClickOpen} 
                color='primary'
                size='large'>
                <FilterIcon fontSize='large'/>
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
                            fields.map(field => (
                            <ListItem className={styles.item}>
                                <ListItemText
                                    primary={field.label}
                                />
                                <IconButton aria-label="add" onClick={handleAdd(field)}
                                    color='default'
                                    size='medium'>
                                    <AddIcon/>
                                </IconButton>
                            </ListItem>
                            ))
                        }   
                    </List>
                </Box>
                <Divider variant="middle"/>
                {
                    filterlist.map((filter, index) => (
                        <Box className={styles.box_filtro}>
                            <div className={styles.filtro_subtitle}>
                                <Typography variant="body1">
                                    {filter.field.label}
                                </Typography>
                            </div>
                            <div className={styles.flex_row}>
                                <div className={styles.flex_column}>
                                <InputLabel htmlFor="operation">Comparação</InputLabel>
                                <Select
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
                                <div className={styles.flex_column}>
                                    <InputLabel htmlFor="value">Valor</InputLabel>
                                    <Input
                                        required
                                        key={index}
                                        value={filterlist[index].value}
                                        onChange={handleValueChange(index)}
                                    ></Input>
                                </div>
                                <IconButton aria-label="delete" onClick={handleRemove(filterlist[index].value, index)} 
                                    color='default'
                                    size='medium'>
                                    <DeleteIcon />
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