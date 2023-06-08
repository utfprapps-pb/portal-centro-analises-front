import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select, Switch, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

import FilterIcon from '@material-ui/icons/AddCircle';
import IconButton from '@mui/material/IconButton';
import { SelectChangeEvent } from "@mui/material";

export function FilterDialog() {
    const [open, setOpen] = useState(false);
    const [field, setField] = useState('');
    const [operation, setOperation] = useState(':');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleCancel = () => {
        setOperation(':')
        setField('name')
        setSearch('')
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClean = () => {
        setOperation(':')
        setField('name')
        setSearch('')
        setFilter('')
    };

    const handleOperationChange = (event: SelectChangeEvent<typeof operation>) => {
        setOperation(
            event.target.value,
        );
    };

    const handleFieldChange = (event: SelectChangeEvent<typeof field>) => {
        setField(
            event.target.value,
        );
    };

    const handleSearchChange = (event: SelectChangeEvent<typeof search>) => {
        setSearch(
            event.target.value,
        );
    };

    const handleConfirm = () => {
        console.log('filtrado',filter)
        setFilter(filter && filter.length ? filter + ',' +field+operation+search : field+operation+search);
        handleClose()
    };

    return (
        <div>
            <IconButton aria-label="filter" onClick={handleClickOpen} 
                color='primary'
                size='large'>
                <FilterIcon fontSize='large'/>
            </IconButton>
            <Dialog
            fullWidth={false}
            maxWidth='sm'
            open={open}
            onClose={handleClose}
            >
            <DialogTitle>Filtros</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Selecione
                </DialogContentText>
                <Box>
                <FormControl>
                    <InputLabel htmlFor="campo">Campo</InputLabel>
                    <Select
                        autoFocus
                        value={field}
                        onChange={(e) => handleFieldChange(e)}
                        label="campo"
                    >
                    <MenuItem value="name">Nome</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Box>    
                <FormControl>
                    <InputLabel htmlFor="operation">Filtro</InputLabel>
                    <Select
                        autoFocus
                        value={operation}
                        onChange={(e) => handleOperationChange(e)}
                        label="operation"
                    >
                        <MenuItem value=":">Igual</MenuItem>
                        <MenuItem value="!">Diferente</MenuItem>
                        <MenuItem value=">">Maior que</MenuItem>
                        <MenuItem value="<">Menor que</MenuItem>
                        <MenuItem value="~">Contém</MenuItem>
                        <MenuItem value="-">Data</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Box>
                <FormControl>
                    <InputLabel htmlFor="search">Busca</InputLabel>
                    <Input
                        required
                        value={search}
                        onChange={(e) => handleSearchChange(e)}
                    ></Input>
                </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClean}>Limpar</Button>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button onClick={handleConfirm}>Confirmar</Button>
            </DialogActions>
            </Dialog>
        </div>
        );
}