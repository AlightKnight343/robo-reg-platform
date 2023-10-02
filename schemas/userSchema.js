const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };
const nonReqString = { type: String, required: false };

const userSchema = new Schema(
    {
        regType: reqString, //school, indi
        school: {
            schoolName: nonReqString,
            schoolAddress: nonReqString,
            schoolEmail: nonReqString,
            clubName: nonReqString,
            clubEmail: nonReqString,
            clubWebsite: nonReqString,
            teacherName: nonReqString,
            teacherEmail: nonReqString,
            teacherPhone: nonReqString,
            studentName: nonReqString,
            studentEmail: nonReqString,
            studentPhone: nonReqString,
            pass: nonReqString,
        },
        indi: {
            firstName: nonReqString,
            lastName: nonReqString,
            email: nonReqString,
            phone: nonReqString,
            pass: nonReqString,
            discordCode: nonReqString,
            dob: nonReqString,
            grade: nonReqString,
            schname: nonReqString,
        },
        discordCode: nonReqString,
        teamSchemaID: nonReqString,
        admin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("School", userSchema);