import express from "express";
import multer from "multer";
import xml2js from "xml2js";
import xlsx from "xlsx";
import fs from "fs";
import csv from "csvtojson";

const app = express();

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() }); // Change 'uploads/' if needed

app.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req;

  // Check for uploaded file
  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  // Get file extension
  const extension = file.originalname.split(".").pop().toLowerCase();

  let jsonData;
  try {
    switch (extension) {
      case "xlsx":
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        jsonData = xlsx.utils.sheet_to_json(worksheet);
        break;
      case "csv":
        const csvFile = req.file;
        const bufferData = Buffer.from(csvFile.buffer);
        const jsonFormated = await csv().fromString(bufferData.toString());
        jsonData = JSON.parse(JSON.stringify(jsonFormated));
        break;
      case "xml":
        const parser = new xml2js.Parser();
        jsonData = await new Promise((resolve, reject) => {
          parser.parseString(req.file.buffer.toString(), (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
        break;
      case "xls":
        function xlsToJson(buffer) {
          const workbook = xlsx.read(buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(worksheet, { raw: true });
        }
        if (!req.file || req.file.mimetype !== "application/vnd.ms-excel") {
          return res
            .status(400)
            .json({ error: "Please upload a valid XLS file." });
        }
        jsonData = xlsToJson(req.file.buffer);
        break;
      case "txt":
        jsonData = {text: req.file.buffer.toString() }; // Convert buffer to string
        break;
      case "json":
        jsonData = JSON.parse(req.file.buffer.toString()); // Parse JSON data
        break;
      default:
        return res.status(400).send("Unsupported file format");
    }
    res.json(jsonData);
  } catch (err) {
    console.error("Error converting file:", err);
    res.status(500).send("Error during conversion");
  } finally {
    // Clean up uploaded file (optional)
    // fs.promises.unlink(file.path); // Uncomment to delete uploaded file
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));
