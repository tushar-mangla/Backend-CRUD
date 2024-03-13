const { getAllProjects, getProject, updateProject } = require("../services/queries");
const { USER_ROLES } = require("../utils/constants");
const { errorHandler } = require("../utils/helper");


module.exports = {
    getProjects: async (req, res) => {
        try {
            const clientId = res.locals.user._id;
            const role = res.locals.user.role
            //as this api is open to all three users so we have to filter the data on basis of clientId only when the user is client else we have to return all the projects data
            const filter = {
                ...(role === USER_ROLES.Client && { clientId }),
            }
            //use the above filter to fetch result the data from the table
            //return all the projects list in which the client is assigned to clientId
            //or return all the projects list if the user is superadmin or admin
            const data = await getAllProjects(filter);

            return res.status(200).json({ message: 'Data Fetched Successfully', data });
        } catch (error) {
            return errorHandler(res, error.message);
        }
    },

    getProjectById: async (req, res) => {
        try {
            const clientId = res.locals.user._id;
            const projectId = req.params.id;
            if (!projectId) {
                return errorHandler(res, "Project Id is required.", 400);
            }
            const data = await getProject({
                _id: projectId,
                ...(role === USER_ROLES.Client && { clientId }),
            });
            //check if the client is assigned to that project (only if the user is client else no need to check if the client is assigned for superadmin and admin) if yes return the project else return error
            //if(client is not assigned to that project id)
            // return errorHandler(res, "You are not allowed to view this.", 403);
            return res.status(200).json({ message: 'Data Fetched Successfully', data });
        } catch (error) {
            return errorHandler(res, error.message);
        }
    },

    addProject: async (req, res) => {
        try {
            const data = await saveProject(req.body);
            return res.status(200).json({ message: 'Saved Successfully' });
        } catch (error) {
            return errorHandler(res, error.message);
        }
    },
    editProject: async (req, res) => {
        try {
            const projectId = req.params.id;
            if (!projectId) {
                return errorHandler(res, "Project Id is required.", 400);
            }
            const data = await updateProject({
                _id: projectId,
            }, req.body);
            return res.status(200).json({ message: 'Data Updated Successfully' });
        } catch (error) {
            return errorHandler(res, error.message);
        }
    },
    deleteProject: async (req, res) => {
        try {
            const projectId = req.params.id;
            if (!projectId) {
                return errorHandler(res, "Project Id is required.", 400);
            }
            //find in db using id and remove
            const data = await this.deleteProject({
                _id: projectId,
            });
            return res.status(200).json({ message: 'Saved Successfully' });
        } catch (error) {
            return errorHandler(res, error.message);
        }
    },
}