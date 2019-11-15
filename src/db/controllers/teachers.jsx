import {listTeachers, deleteTeacher, updateTeacher, saveTeacher, queryTeacherById} from "../services/teachers";

const fetchTeachers = async (req, res) => {
    try {
        let {rows} = await listTeachers();
        res.json(rows)
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

const fetchTeacherById = async (req, res) => {
    try {
        let {id} = req.params;
        let {rows} = await queryTeacherById(id);
        if (rows.length === 0) return res.status(404);
        res.json({...rows[0]});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

const trySaveTeacher = async (req, res) => {
    try {
        let {rowCount} = await saveTeacher(req.body);
        if (rowCount)
            res.status(201).json({created: true});
        else
            res.json({created: false})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

const tryUpdateTeacher = async (req, res) => {
    try {
        let {id} = req.body;
        let {rowCount} = await updateTeacher(id, req.body);
        if (rowCount)
            res.status(204).json({updated: true});
        else
            res.json({updated: false})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

const tryDeleteTeacher = async (req, res) => {
    try {
        let {id} = req.body;
        let {rowCount} = await deleteTeacher(id);
        if (rowCount)
            res.status(204).json({deleted: true});
        else
            res.json({deleted: false})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

export {
    fetchTeachers,
    fetchTeacherById,
    trySaveTeacher,
    tryUpdateTeacher,
    tryDeleteTeacher,
};