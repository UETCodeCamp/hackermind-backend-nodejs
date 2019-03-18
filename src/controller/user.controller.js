const User = require('../action/user');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = require('../../key');
const db = require('../database');
const Team = require('../action/team');

async function register(req, res) {
    const {
        user_name,
        password,
        email,
        name
    } = req.body;
    try {
        if(!user_name || !password || !email || !name){
            throw new Error("Bạn vui lòng điền đủ theo mẫu.")
        }
        const contrain = {
            user_name: user_name
        };
        const user = await User.findUser(contrain);
        // let pass = /^(?=.*\d)(?=.*[!@#$%_^&*])(?=.*[a-zA-Z]).{8,}$/;
        // if (!pass.test(password)) {
        //     return res.json(response.fail("Mật khẩu bao gồm ít nhất 8 kí tự, trong đó chứa ít nhất 1 chữ, 1 số và 1 kí tự đặc biệt"));
        // }
        if(password.length < 8){
            throw new Error("Mật khẩu phải có ít nhất 8 kí tự.");
        }
        if (user == null) {
            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);
            let payload = {
                user_name: user_name,
                role_id: 3,
                email: email,
                name: name,
                password: hashPassword,
                create_time: Date.now()
            };
            const newUsers = await User.createUser(payload);
            return res.json(response.success({}));
        }
        else{
            throw new Error("Tài khoản đã tồn tại.");
        }
    } catch (err) {
        console.log("Error : ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function login(req, res) {
    const {user_name, password} = req.body;
    try {
        const user = await db.UserModel.findOne({
            where: {
                user_name: user_name
            }
        });
        if (!user) {
            throw new Error("Tài khoản không tồn tại!")
        } else {
            const sixHours = 6 * 60 * 60;
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({
                        id: user.id,
                        role_id: user.role_id
                    },
                    key.ACCESS_SECRET_KEY, {
                        expiresIn: sixHours
                    }
                );
                return res.json(response.success({token}));
            } else {
                throw new Error("Mật khẩu không chính xác!");
            }

        }
    } catch (err) {
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function getProfile(req, res) {
    try {
        const user_id = req.tokenData.id;
        const user = await User.findUser({id: user_id});
        return res.json(response.success({user}));
    } catch (err) {
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putProfile(req, res) {
    try {
        const {name, description, avatar, email} = req.body;
        const payload = {
            name: name,
            description: description,
            email: email,
            avatar: avatar
        };
        const user = await User.updateUser(payload, {id: req.tokenData.id});
        return res.json(response.success({}));
    } catch (err) {
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function getTeams(req, res) {
    try {
        const user_id = req.tokenData.id;
        let teams = await Team.findTeams({user_id: user_id});
        teams = teams.map(e => {
            return e.team;
        });
        return res.json(response.success({teams}));
    } catch (err) {
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

async function changeRole(req, res) {
    try {
        const {user_id, role_id} = req.body;
        const role = await db.RoleModel.findOne({
            where: {
                id: role_id
            }
        });
        let user = await User.findUser({id: user_id});
        if (!role) {
            throw new Error("Quyền không tồn tại.");
        }
        if (!user) {
            throw new Error("User không tồn tại.");
        }
        user = await User.updateUser({role_id: role_id}, {id: user_id});
        return res.json(response.success({}));

    } catch (err) {
        console.log("Error:", err.message);
        return res.json(response.fail(err.message));
    }
}

module.exports = {
    register,
    login,
    getProfile,
    putProfile,
    getTeams,
    changeRole
};
