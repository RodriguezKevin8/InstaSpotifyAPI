
import perfild from "../Models/perfilModel.js";

export default class perfilController {
    static async createPerfil(req, res) {
        const obj = {value:null, msg:"", status:false}

        try {
            req.body.avatar_url = req.file ? req.file.path : null;
            const perfil = await perfild.createPerfil(req.body);
            if (!perfil) {
                obj.msg = "Perfil not created";
                return res.status(400).json(obj);
            }
            obj.value = perfil;
            obj.msg = "Perfil created successfully";
            obj.status = true;
            return res.status(201).json(obj);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPerfil(req, res) {
        const obj = {value:null, msg:"", status:false}
        const id = parseInt(req.params.id);
        try {
            const perfil = await perfild.getPerfil(id);
            if (!perfil) {
                obj.msg = "Perfil not found";
                return res.status(404).json(obj);
            }
            obj.value = perfil;
            obj.msg = "Perfil found";
            obj.status = true;
            return res.status(200).json(obj);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePerfil(req, res) {
        const obj = {value:null, msg:"", status:false}
        const id = parseInt(req.params.id);
        try {
            req.body.avatar_url = req.file ? req.file.path : null;
            const perfil = await perfild.updatePerfil(id, req.body);
            if (!perfil) {
                obj.msg = "Perfil not updated";
                return res.status(400).json(obj);
            }
            obj.value = perfil;
            obj.msg = "Perfil updated successfully";
            obj.status = true;
            return res.status(200).json(obj);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}