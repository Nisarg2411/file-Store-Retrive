const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const FileSchema = require("../models/schema");
const asyncHandler = require("express-async-handler");

let upload_path = path.join(__dirname, "../uploadFolder/");


const uploadFile = asyncHandler(async (req, res, next) => {

  // Copy from here to use formidable
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    // All the other data like req.body stored in fields, so use fields for access req.body
    const { username } = fields;

    if (!username) {
      res.status(401);
      return next(new Error("Please provide username"));
    }

    // Operation to perform if no any file uploaded
    if (!files.uploadFile) {
      try {
        const response = await FileSchema.create({
          name: username,
          path: "",
          fileName: "default.jpg",
        });
        res.json(response);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      return;
    }

    // oldpath shows the original path of file
    var oldpath = files.uploadFile.filepath;
    // newpath indicates new path, which is absolute path, not usefull as well
    var newpath =
      upload_path +
      new Date().getTime() +
      path.extname
        (files.uploadFile.originalFilename);

    //newName indicates the new name which is stored in timestamp.extension format
    let newName =
      new Date().getTime() + path.extname(files.uploadFile.originalFilename);

    // rename stores the file in newpath i.e. in  uploadedFolder
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw new Error(err);
    });
    try {
      const response = await FileSchema.create({
        name: username,
        path: newpath,
        fileName: newName,
      });
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
});

const getAllFiles = asyncHandler(async (req, res) => {
  const allFile = await FileSchema.find({});
  res.json(allFile);
});
module.exports = { uploadFile, getAllFiles };
