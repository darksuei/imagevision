export {};
const { Dropbox } = require("dropbox");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

//Basic Dropbox Settings
const dbx = new Dropbox({ accessToken: process.env.DBX_ACCESS_TOKEN });

//Get the current account info
export const getDbxAcc = () => {
  dbx
    .usersGetCurrentAccount()
    .then((response: any) => {
      if (response.result.account_id) {
        console.log("Dropbox connection successful!");
      }
    })
    .catch((error: any) => {
      console.error(error);
    });
};

//Function to upload single file
export const uploadFileDbx = (filename: string, filepath: string) => {
  fs.readFile(
    path.join(__dirname, filename),
    "utf8",
    (err: never, contents: any) => {
      if (err) {
        console.error(err);
      }

      // This uploads the specified file to a folder called apiuploads on your dropbox
      dbx
        .filesUpload({ path: filepath, contents })
        .then((response: any) => {
          console.log("File uploaded successfully!");
          console.log(response);
        })
        .catch((error: any) => {
          if (error.response && error.response.status === 400) {
            console.error(
              "Bad request. Check your Dropbox API parameters:",
              error,
            );
          } else if (error.response && error.response.status === 409) {
            console.error(
              "File already exists at the destination path:",
              error,
            );
          } else {
            console.error("Error uploading the file:", error);
          }
        });
    },
  );
};
