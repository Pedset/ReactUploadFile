const Model = require('../models/user.changeText.js');

const missingFileError = {
    InfoMessage: "No file uploaded"
}
let serverError = {
    InfoMessage: "There was a problem with the server"
}

exports.controller = (req, res) =>{
   
    if (req.file === undefined || req.file === null) return  res.status(400).send(missingFileError)
    
    Model.changeText(req.file, (err, data) =>{
        if(err){
            serverError["Error"] = data.message;
            return res.status(500).send(serverError)
        }
        return res.send(data);
    }); 

}