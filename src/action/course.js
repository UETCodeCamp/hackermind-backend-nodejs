const db = require('../database');


module.exports.getCourses = async () => {
    const courses = await db.CourseModel.findAll();
    return courses;
};

module.exports.getCourse = async (contrain) => {
    const course = await db.CourseModel.findOne({where: contrain});
    return course;
};
module.exports.createCourse = async (payload) => {
    const course = await db.CourseModel.create(payload);
    return course;
};

module.exports.updateCourse = async (payload, contrain) => {
    const course = await db.CourseModel.update(payload, {
        where: {
            id: contrain.course_id
        }
    });
    return course;
};


module.exports.addTeamToCourse = async (payload) => {
    const team = await db.TeamCourseModel.create(payload);
    return team;
};

module.exports.removeTeamFromCourse = async (contrain) => {
    const team = await db.TeamCourseModel.destroy({
        where: contrain
    });
    return team;
};