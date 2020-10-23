const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpeningSchema = new Schema({
    appliedUsers: [String],
    project: String,
    role: { type: String, enum: ['Frontend Developer', 'Backend Developer', 'Quality Analyst', 'Business Analyst', 'Data Analyst'] },
    client: String,
    isOpen: Boolean,
    description: String,
    createdBy: String,
    technologies: String
})

module.exports = mongoose.model('Openings', OpeningSchema);