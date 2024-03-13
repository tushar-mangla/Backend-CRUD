
const getProject = async (filter) => {
    return await Project.findOne(filter);
}
const getAllProjects = async (filter) => {
    return await Project.find(filter);
}
const updateProject = async (filter, updateObj) => {
    return await Project.findOneAndUpdate(filter, updateObj, { new: true });
}
const saveProject = async (createObj) => {
    return await Project.create(createObj);
}
const deleteProject = async (filter) => {
    return await Project.fineOneAndRemove(filter);
}

module.exports = {
    getProject, getAllProjects, updateProject, saveProject, deleteProject
}