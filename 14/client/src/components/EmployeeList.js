// src/components/EmployeeHierarchy.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeHierarchy = () => {
	const [averageSalary, setAverageSalary] = useState(null);
	const [employeeWithMostSubordinates, setEmployeeWithMostSubordinates] = useState(null);
	const [totalCountAtJobLevel, setTotalCountAtJobLevel] = useState(null);

	useEffect(() => {
		// Fetch data from your backend API endpoints

		axios.get('http://localhost:4000/average-salary')
			.then((response) => {
				setAverageSalary(response.data.averageSalary);
			})
			.catch((error) => {
				console.error('Error fetching average salary', error);
			});

		axios.get('http://localhost:4000/employee-most-subordinates')
			.then((response) => {
				setEmployeeWithMostSubordinates(response.data.employeeWithMostSubordinates);
			})
			.catch((error) => {
				console.error('Error fetching employee with most subordinates', error);
			});

		axios.get('http://localhost:4000/total-employees-at-job-level')
			.then((response) => {
				setTotalCountAtJobLevel(response.data.totalCountAtJobLevel);
			})
			.catch((error) => {
				console.error('Error fetching total employees at job level', error);
			});
	}, []);

	return (
		<div>
			<h2>Calculated Data</h2>
			<div>
				<h3>Average Salary</h3>
				{averageSalary !== null ? <p>{averageSalary}</p> : <p>Loading...</p>}
			</div>
			<div>
				<h3>Employee with Most Subordinates</h3>
				{employeeWithMostSubordinates !== null ? (
					<p>{employeeWithMostSubordinates.name} - Subordinate Count: {employeeWithMostSubordinates.subordinates.length}</p>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<div>
				<h3>Total Employees at Job Level (Manager)</h3>
				{totalCountAtJobLevel !== null ? <p>{totalCountAtJobLevel}</p> : <p>Loading...</p>}
			</div>
		</div>
	);
};

export default EmployeeHierarchy;
