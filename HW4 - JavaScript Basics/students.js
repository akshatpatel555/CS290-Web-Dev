// HW 4 Starter Code
// Name: Akshat Patel
// Date: 4/27/24
// Description: All code must be commented.   Add a description

// student array creation
const students = [];

// Function Definition - Calculate Average Score
function calculateAverageScore(student) {
  const averageScore = student.scores.reduce((total, score)=> total + score, 0) / student.scores.length
  student.averageScore = averageScore //update "average" property of student object
}

// Function Definition - Assign Grade
function assignGrade(student) {
  const averageScore = student.averageScore || calculateAverageScore(student)
  let grade
  if (averageScore >= 90) {
    grade = 'A'
  } else if (averageScore >= 80) {
    grade = 'B'
  } else if (averageScore >= 70) {
    grade = 'C'
  } else if (averageScore >= 60) {
    grade = 'D'
  } else {
    grade = 'F'
  }
  student.grade = grade
}

// Function Definition - Display Student Information
function displayStudentInfo(student) {
  const averageScore = student.averageScore || calculateAverageScore(student)
  const grade = student.grade || assignGrade(student) // Assign grade if not already assigned
  console.log(`Student Name: ${student.name}`)
  console.log(`Scores: ${student.scores.join(', ')}`)
  console.log(`Average Score: ${student.averageScore}`)
  console.log(`Grade: ${student.grade}`)
  console.log("---------------------------------------")
}

// Function Definition - Return the names of students with an average
// score >= 93

function findHighestGrades(students) {
  return students.filter(student => {
    const averageScore = student.averageScore || calculateAverageScore(student) // Calculate average score if not already calculated
    return averageScore >= 93
  }).map(student => student.name)
}

// Function Definition - Add Student to the Students Array
function addStudent(students, newStudent) {
	students.push(newStudent)
}

// Student Object
function Student (name, scores) {
	this.name = name
  this.scores = scores
	
}
const student1 = new Student("John Doe", [77, 92, 78, 90] );
const student2 = new Student("Sam Smith", [95, 96, 98, 88] );
const student3 = new Student("Amy Lee", [95, 92, 98, 93] );
const student4 = new Student("Ann Green", [75, 92, 78, 63] );
const student5 = new Student("Pat Jones", [75, 92, 78, 50,70] );

// Add students to the array
addStudent(students, student1);
addStudent(students, student2);
addStudent(students, student3);
addStudent(students, student4);
addStudent(students, student5);


// Prompt user to enter name of student and return the
// students information if the student is in the list otherwise
// indicate that the student was not found.

function findStudent () {
	const name = prompt("Enter a students full name:")
  const student = students.find(student => student.name == name)
  if (student) {
    displayStudentInfo(student)
  } else {
    console.log("Student not found")
  }
}


// Display student information
console.log("Display all Students:")
console.log("---------------------------------------")
students.forEach(student => displayStudentInfo(student))  //calls student display function

// Find & display names of students with the average grades over 93
console.log("\nStudents with Average Grades >= 93:")
console.log("---------------------------------------")
const bestGrades = findHighestGrades(students)  //calls fundHighestGrade Function
bestGrades.forEach(name => console.log(name))
console.log("---------------------------------------")

findStudent();
findStudent();
