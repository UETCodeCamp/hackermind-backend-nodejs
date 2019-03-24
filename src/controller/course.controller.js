const response = require('../utils/response');
const Course = require('../action/course');
const db = require('../database');

async function getAllCourses(req, res) {
    try{
        let courses = await Course.getCourses();
        // courses = courses.map(e => {
        //    return courses
        // });
        return res.json(response.success({courses}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function getCourse(req, res) {
    try{
        const {course_id} = req.params;
        const course = await db.CourseModel.findOne({
            where: {
                id: course_id
            }
        });
        console.log(course);
        return res.json(response.success({course}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}
async function createCourse(req, res){
    try{
        const {description, name, avatar, image} = req.body;
        const payload = {
            description: description,
            name: name,
            avatar: avatar,
            image: image,
            create_time: Date.now()
        };
        const course = await Course.createCourse(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function putCourse(req, res){
    try{
        const {description, name, avatar, image} = req.body;
        const {course_id} = req.params;
        const payload = {
            description: description,
            name: name,
            avatar: avatar,
            image: image,
            create_time: Date.now()
        };
        const course = await Course.updateCourse(payload, {course_id: course_id});
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}


async function addTeamToCourse(req, res){
    const {course_id, team_id} = req.body;
    try{
        const team = await db.TeamModel.findOne({
            where: {
                id: team_id
            }
        });
        if(!team){
            throw new Error("Team này không tồn tại.");
        }
        const course = await db.CourseModel.findOne({
            where: {
                id: course_id
            }
        });
        if(!course){
            throw new Error("Course này không tồn tại.");
        }
        const payload = {
            team_id: team_id,
            course_id: course_id
        };
        const result  = await Course.addTeamToCourse(payload);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}

async function removeTeamFromCourse(req, res){
    const {course_id, team_id} = req.params;
    try{
        const team = await db.TeamModel.findOne({
            where: {
                id: team_id
            }
        });
        if(!team){
            throw new Error("Team này không tồn tại.");
        }
        const course = await db.CourseModel.findOne({
            where: {
                id: course_id
            }
        });
        if(!course){
            throw new Error("Course này không tồn tại.");
        }
        const contrain = {
            team_id: team_id,
            course_id: course_id
        };
        const result  = await Course.removeTeamFromCourse(contrain);
        return res.json(response.success({}));
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}


async function checkActiveToLearn(req, res){
    const {course_id} = req.params;
    try{
        const team = await db.TeamUserModel.findOne({
            where: {
                user_id: req.tokenData.id
            }
        });
        console.log("team:", team);
        let course;
        if(team){
            course = await db.TeamCourseModel.findOne({
                where: {
                    team_id: team.dataValues.id,
                    course_id: course_id
                }
            });
        }
        console.log("course: ", course);
        if(!course){
            throw new Error("Bạn không thể tham gia khóa học này.");
        }
        else{
            const chapter = await db.ChapterModel.findAll({
                where: {
                    course_id: course_id
                },
                order:[
                    ['create_time', 'ASC']
                ],
                limit: 1
            });
            if(chapter){
                const video = await db.VideoModel.findAll({
                    where: {
                        chapter_id: chapter[0].dataValues.id
                    },
                    order: [
                        ['create_time', 'ASC']
                    ],
                    limit: 1
                });
                return res.json(response.success(video[0]));
            }
            else{
                throw new Error("Khóa học đang được cập nhật. Vui lòng quay lại sau.");
            }
        }
    }
    catch(err){
        console.log("Error: ", err.message);
        return res.json(response.fail(err.message));
    }
}


module.exports = {
    getAllCourses,
    createCourse,
    putCourse,
    addTeamToCourse,
    removeTeamFromCourse,
    checkActiveToLearn,
    getCourse
};