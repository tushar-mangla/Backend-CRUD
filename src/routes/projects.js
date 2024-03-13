const express = require('express');
const { USER_ROLES } = require('../utils/constants');
const { errorHandler } = require('../utils/helper');
const { addProject, getProjectById, getProjects, editProject, deleteProject } = require('../controllers/projectsController');
const projectRoutes = express.Router();

//create (both the superadmin and admin have access)
projectRoutes.post("/save", authorizeUser(USER_ROLES.SuperAdmin, USER_ROLES.Admin), addProject);

//read a single project(anyone superadmin,client(assign to that client) or admin can view)
projectRoutes.get("/project/:id", getProjectById);

//read all the list (anyone superadmin,client(assign to that client) or admin can view)
projectRoutes.get("/projects", getProjects);

//edit  (both the superadmin and admin have access) 
projectRoutes.put("/edit/:id", authorizeUser(USER_ROLES.SuperAdmin, USER_ROLES.Admin), editProject);

//delete  (only superadmin have access)
projectRoutes.delete("/delete/:id", authorizeUser(USER_ROLES.SuperAdmin), deleteProject);



module.exports = projectRoutes