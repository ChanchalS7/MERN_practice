
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
// Read the data from the data.json file
const rawData = fs.readFileSync('data.json');
const taskList = JSON.parse(rawData);

// Function to find the project with the highest estimated time
function findProjectWithHighestEstimatedTime() {
	let maxTime = 0;
	let projectWithHighestTime = null;

	taskList.forEach((project) => {
		if (project.estimatedTime > maxTime) {
			maxTime = project.estimatedTime;
			projectWithHighestTime = project;
		}
	});

	return projectWithHighestTime;
}
// Function to find the task with the most subtasks and its project
function findTaskWithMostSubtasksAndProject() {
	let maxSubtasks = 0;
	let taskWithMostSubtasks = null;
	let projectOfTaskWithMostSubtasks = null;

	taskList.forEach((project) => {
		project.subtasks.forEach((task) => {
			const subtaskCount = countSubtasks(task);
			if (subtaskCount > maxSubtasks) {
				maxSubtasks = subtaskCount;
				taskWithMostSubtasks = task;
				projectOfTaskWithMostSubtasks = project.title;
			}
		});
	});

	return { task: taskWithMostSubtasks, project: projectOfTaskWithMostSubtasks };
}

// Function to calculate the total estimated time for a specific task and its subtasks
function calculateTotalEstimatedTime(task) {
	let totalEstimatedTime = task.estimatedTime;

	task.subtasks.forEach((subtask) => {
		totalEstimatedTime += calculateTotalEstimatedTime(subtask);
	});

	return totalEstimatedTime;
}

// Route to get a list of all projects
app.get('/projects', (req, res) => {
	const projectNames = taskList.map((project) => project.title);
	res.json(projectNames);
});

// Route to get the estimated time of a specific project
app.get('/project-estimated-time/:projectName', (req, res) => {
	const projectName = req.params.projectName;
	const project = findProjectByName(projectName);

	if (project) {
		const projectEstimatedTime = calculateTotalEstimatedTime(project);
		res.json({ project, estimatedTime: projectEstimatedTime });
	} else {
		res.status(404).json({ message: 'Project not found' });
	}
});

// Route to get the list of all task titles
app.get('/task-titles', (req, res) => {
	const taskTitles = [];
	taskList.forEach((project) => {
		project.subtasks.forEach((task) => {
			taskTitles.push(task.title);
		});
	});
	res.json(taskTitles);
});

// Route to get the estimated time of all tasks
app.get('/total-estimated-time/all-tasks', (req, res) => {
	let totalEstimatedTime = 0;

	taskList.forEach((project) => {
		project.subtasks.forEach((task) => {
			totalEstimatedTime += calculateTotalEstimatedTime(task);
		});
	});

	res.json({ totalEstimatedTime });
});

// Route to get the list of all subtask titles
app.get('/subtask-titles', (req, res) => {
	const subtaskTitles = [];
	taskList.forEach((project) => {
		project.subtasks.forEach((task) => {
			task.subtasks.forEach((subtask) => {
				subtaskTitles.push(subtask.title);
			});
		});
	});
	res.json(subtaskTitles);
});
// Route to get the project with the highest estimated time
app.get('/highest-project', (req, res) => {
	const project = findProjectWithHighestEstimatedTime();
	res.json(project);
});
// Route to get the task with the most subtasks and its project
app.get('/most-subtasks', (req, res) => {
	const { task, project } = findTaskWithMostSubtasksAndProject();
	res.json({ task, project });
});

// Route to calculate the total estimated time for a specific task and its subtasks along with the project name
app.get('/total-estimated-time/:taskId', (req, res) => {
	const taskId = req.params.taskId;
	const task = findTaskById(taskId);

	if (task) {
		const totalEstimatedTime = calculateTotalEstimatedTime(task);
		const project = findProjectOfTask(task);

		res.json({ task, totalEstimatedTime, project });
	} else {
		res.status(404).json({ message: 'Task not found' });
	}
});

// Helper function to find a task by its title
function findTaskById(taskId) {
	for (const project of taskList) {
		for (const task of project.subtasks) {
			if (task.title === taskId) {
				return task;
			}
		}
	}
	return null;
}

// Helper function to find the project of a task
function findProjectOfTask(task) {
	for (const project of taskList) {
		for (const t of project.subtasks) {
			if (t === task) {
				return project.title;
			}
		}
	}
	return null;
}

function countSubtasks(task) {
	let count = task.subtasks.length;

	task.subtasks.forEach((subtask) => {
		count += countSubtasks(subtask);
	});

	return count;
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
