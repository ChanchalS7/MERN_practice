const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
// Read employee data from data.json
const employeeData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// Calculate the average salary of all employees and their subordinates
function calculateAverageSalary(employees) {
	let totalSalary = 0;
	let totalEmployees = 0;

	function calculate(employee) {
		totalSalary += employee.salary;
		totalEmployees++;

		employee.subordinates.forEach((subordinate) => {
			calculate(subordinate);
		});
	}

	employees.forEach((employee) => {
		calculate(employee);
	});

	return totalSalary / totalEmployees;
}

// Find the employee with the highest number of subordinates
function findEmployeeWithMostSubordinates(employees) {
	let maxSubordinateCount = 0;
	let employeeWithMostSubordinates = null;

	function findMaxSubordinate(employee) {
		if (employee.subordinates.length > maxSubordinateCount) {
			maxSubordinateCount = employee.subordinates.length;
			employeeWithMostSubordinates = employee;
		}

		employee.subordinates.forEach((subordinate) => {
			findMaxSubordinate(subordinate);
		});
	}

	employees.forEach((employee) => {
		findMaxSubordinate(employee);
	});

	return employeeWithMostSubordinates;
}

// Determine the total number of employees at a certain job level
function countEmployeesAtJobLevel(employees, jobLevel) {
	let count = 0;

	function countEmployees(employee) {
		if (employee.jobLevel === jobLevel) {
			count++;
		}

		employee.subordinates.forEach((subordinate) => {
			countEmployees(subordinate);
		});
	}

	employees.forEach((employee) => {
		countEmployees(employee);
	});

	return count;
}

// Calculate average salary
const averageSalary = calculateAverageSalary(employeeData);

// Find employee with most subordinates
const employeeWithMostSubordinates = findEmployeeWithMostSubordinates(employeeData);

// Determine total employees at a certain job level
const jobLevelToCount = 'Manager'; // Replace with the desired job level
const totalCountAtJobLevel = countEmployeesAtJobLevel(employeeData, jobLevelToCount);

// API endpoints
app.get('/average-salary', (req, res) => {
	res.json({ averageSalary });
});

app.get('/employee-most-subordinates', (req, res) => {
	res.json({ employeeWithMostSubordinates });
});

app.get('/total-employees-at-job-level', (req, res) => {
	res.json({ totalCountAtJobLevel });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
