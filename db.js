const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/jrenrichment', {
  logging: false
});

const Student = db.define("student" , {
	/* STUDENT MODEL CODE HERE */
	name : {
		type: Sequelize.STRING,
		allowNull: false
	},
	GPA: {
		type: Sequelize.STRING,
		allowNull: false
	},
	teacherID: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	grade: {
		type: Sequelize.VIRTUAL,
		get () {
			let gradePoint = Number(this.GPA);
			if (gradePoint >= 4) return 'A'
			else if (gradePoint >= 3) return 'B'
			else if (gradePoint >= 2) return 'C'
			else if (gradePoint >=1) return 'D'
		}
	}
});

Student.getPerfect = () => {
	return Student.findAll({
		where: {
			grade: 'A'
		}
	})
}


const Teacher = db.define('teacher', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	subject: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Teacher.hasMany(Student);

// Student.create({
// 	name: 'John2',
// 	GPA: '3.0'
// })

module.exports = {db, Student, Teacher}