

//models

// USER TABLE
// name:String
// role:client or admin or superadmin
// email:String,
// phone :Number
// joinedAt:Number


//PROJECT

//clientId:string,
// completionData:Number
//etc

const Joi = require('joi');
const mongoose = require('mongoose');

// Define Joi schema for User
const userJoiSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().valid('client', 'admin', 'superadmin').required(),
    email: Joi.string().email().required(),
    phone: Joi.number().optional(),
    joinedAt: Joi.date().timestamp().default(Date.now)
});

// Define Joi schema for Project
const projectJoiSchema = Joi.object({
    clientId: Joi.string().required(),
    completionDate: Joi.date().timestamp().optional()
});

// Mongoose schema for User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'admin', 'superadmin'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    joinedAt: {
        type: Number,
        default: Date.now
    }
});

// Mongoose schema for Project
const projectSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completionDate: {
        type: Number
    },
});