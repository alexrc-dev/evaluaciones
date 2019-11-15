import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Toolbar,
    IconButton,
    Tooltip,
    Typography,
    Table,
    TableBody,
    Paper,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    TablePagination
} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";
import clsx from "clsx";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const tableToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));
const TableToolbar = props => {
    const classes = tableToolbarStyles();
    const {numSelected, addCallback, editCallback, deleteCallback} = props;
    return (
        <Toolbar className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} seleccionado (s)
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    Todos los Profesores
                </Typography>
            )}
            {numSelected === 1 && (
                <Tooltip title="Editar">
                    <IconButton onClick={editCallback} aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Eliminar">
                    <IconButton onClick={deleteCallback} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Nuevo">
                    <IconButton onClick={addCallback} aria-label="new">
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
};

const MiTableHead = props => {
    const {classes, onSelectAllClick, numSelected, rowCount, headCells} = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding={"checkbox"}>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
};
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function DataTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const {rows, headCells, addCallback, editCallback, deleteCallback} = props;

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n, k) => k);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, index) => {
        const selectedIndex = index;
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = index => selected[index] === index;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleEditCallback = () => {
        editCallback(selected);
    };
    const handleDeleteCallback = () => {
        deleteCallback(selected);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableToolbar editCallback={handleEditCallback} deleteCallback={handleDeleteCallback}
                              addCallback={addCallback} numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        size={"medium"}
                    >
                        <MiTableHead
                            classes={classes}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(index);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, index)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            {headCells.map((cell, key) => (
                                                <TableCell scope={cell.primary ? 'row' : ''}
                                                           padding={cell.primary ? 'none' : ''}
                                                           component={cell.primary ? 'th' : ''} key={key}
                                                           id={cell.primary ? labelId : ''}>
                                                    {row[cell.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

DataTable.propTypes = {
    rows: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
    addCallback: PropTypes.func,
    editCallback: PropTypes.func,
    deleteCallback: PropTypes.func,
};

