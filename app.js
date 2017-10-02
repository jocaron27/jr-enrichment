const express = require('express');
const app = express();

const db = require('./db').db;
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;
let PORT = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



// app.get("/test", (req, res, next) => {
// 	// Visit http://localhost:8080/test to see the message!
// 	res.send("Hello GET Route!")
// })
/* 
 Your Route Code Here
*/


app.get('/students', (req, res, next) => {
	Student.findAll({})
	.then((students) => {
		res.json(students);
	})
	.catch(next);
})

app.get('/students/grades/:id', (req, res, next) => {
	Student.findOne({
		where: {
			id: req.params.id
		}
	})
	.then((student) => {
		res.json(student.grade);
	})
	.catch(next);
})

app.get('/teachers', (req, res, next) => {
	Teacher.findAll({})
	.then((teachers) => {
		res.json(teachers);
	})
	.catch(next);
})

app.post('/students', (req, res, next) => {
	var name = req.body.name;
	var gpa = Number(req.body.gpa);
	var teacher = req.body.teacherId;
	Student.create({
		name: name,
		GPA: gpa,
		teacherID: teacher,
		teacherId: teacher
	})
	.then((student) => {
		res.json(student);
	})
})

app.post('/teachers', (req, res, next) => {
	var name = req.body.name;
	var subject = req.body.subject;
	Teacher.create({
		name: name,
		subject: subject
	})
	.then((teacher) => {
		res.json(teacher);
	})
})

app.get('/students/:id', (req, res, next) => {
	Student.findOne({
		where: {
			id: req.params.id
		}
	})
	.then((student) => {
		res.json(student.grade);
	})
})

app.put('students/edit', (req, res, next) => {
	let studentID = req.body.id;
	let teacherID = Number(req.body.teacherId);
	Student.findOne({
		where: {
			id: studentID
		}
	})
	.then((student) => {
		let teacher = teacherID;
		return student.update({
			teacherId : teacher
		})
	})
	.then((student) => {
		res.json(student);
	})
	.catch(next);	
})

app.get('/teachers/:id', (req, res, next) => {
	Teacher.findOne({
		where: {
			id: req.params.id
		}
	})
	.then((teacher) => {
		res.json(teacher);
	})
	.catch(next);
})

app.get('/students/:teacherId', (req, res, next) => {
	Student.findAll({
		where: {
			teacherID: req.params.teacherId
		}
	})
	.then((students) => {
		res.json(students);
	})
	.catch(next);
})

app.delete('/students/:id', (req, res, next) => {
	Student.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(() => {
		res.status(202);
	})
	.catch(next);
})

db.sync()
.then(() => {
	console.log('db synced')
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
});