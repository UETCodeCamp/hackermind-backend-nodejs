const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const bcrypt = require('bcrypt');
const response = require('./response');
const db = require('../database');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.originalname.split('.')[file.originalname.split('.').length - 1] !== "xlsx" && file.originalname.split('.')[file.originalname.split('.').length - 1] !== "xls") {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');


module.exports.autoAdd = async (req, res) => {
        let exceltojson;
        try{
            upload(req, res, async function (err) {
                if (err) {
                    throw new Error(err);
                }
                if (!req.file) {
                    throw new Error("No file choose");
                }
                if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                    exceltojson = xlsxtojson;
                } else {
                    exceltojson = xlstojson;
                }
                await exceltojson({
                    input: req.file.path,
                    output: null,
                }, async function (err, jsonFile) {
                    if (err) {
                        throw new Error("Something went wrong");
                    }
                    const {team_id} = req.body;
                    let i=0;
                    let team = await db.TeamModel.findOne({
                        where: {
                            id: team_id
                        }
                    });
                    if(!team){
                        throw new Error("Team không tồn tại.")
                    }
                    for(i=0; i < jsonFile.length; i++){
                        if(jsonFile[i].email && jsonFile[i].phone){
                            let salt = await bcrypt.genSalt(10);
                            let hashPassword = await bcrypt.hash(jsonFile[i].phone, salt);
                            let user = await db.UserModel.findOrCreate({
                                where: {
                                    user_name: jsonFile[i].email
                                },
                                defaults: {
                                    user_name: jsonFile[i].email,
                                    email: jsonFile[i].email,
                                    name: jsonFile[i].name,
                                    password: hashPassword,
                                    role_id: 3,
                                    create_time: Date.now(),
                                    avatar: "/img/avatar.png"
                                }
                            });
                            await db.TeamUserModel.findOrCreate({
                                where: {
                                    user_id: user[0].dataValues.id,
                                    team_id: team_id
                                },
                                defaults: {
                                    user_id: user[0].dataValues.id,
                                    team_id: team_id
                                }
                            });
                        }
                    }
                    return res.json(response.success({}));
                });
            })
        }
        catch(err){
            console.log("Error: ", err.message);
            return res.json(response.fail(err.message));
        }
};