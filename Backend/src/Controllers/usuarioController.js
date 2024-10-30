import usuario from "../Models/usuarioModel.js";
import bcrypt from 'bcrypt';

export default class UserController {
    static async createUser(req, res) {
        const obj = {value:null, msg:"", status:false}
        try {
            const userValidator = await usuario.getUsuarioByEmail(req.body.email);
            if (userValidator) {
                obj.msg = "Email already exists";
                return res.status(400).json(obj);
            }
            const usernameValidator = await usuario.getUsuarioByUserName(req.body.username);
            if(usernameValidator){
                obj.msg = "Username already exists";
                return res.status(400).json(obj);
            }
            const user = await usuario.createUsuario(req.body);
            obj.value = user;
            obj.msg = "User created successfully";
            obj.status = true;
            return res.status(201).json(obj);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        const obj = {value:null, msg:"", status:false}
        try {
            const user = await usuario.getUsuarioByEmail(req.body.email);
            if (!user) {
                obj.msg = "User not found";
                return res.status(404).json(obj);
            }
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (!valid) {
                obj.msg = "Invalid password";
                return res.status(400).json(obj);
            }
            obj.value = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                nombre: user.nombre
            };
            obj.msg = "User logged in successfully";
            obj.status = true;
            return res.status(200).json(obj);
        } catch (error) {
            res.status(500).json({ error: error.message });}
    }
}