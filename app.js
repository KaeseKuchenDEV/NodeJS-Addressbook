const http = require("http");
let addresses = require("./data/data.js");
const getList =  require("./resBodies/list.js");
const deleteAddress = require("./data/delete.js");
const getForm = require("./resBodies/form.js");
const querystring = require("querystring");
const saveAddress = require("./data/save.js");
const fs = require("fs");
const formidable = require("formidable");

http.createServer(function(req,  res){
    const parts = req.url.split("/");

    if(parts.includes("delete")){
        addresses = deleteAddress(addresses, parts[2]);
        redirect(res, "/");
    }else if(parts.includes("new")){
        send(res, getForm());
    }else if(parts.includes("edit")){
        send(res, getForm(addresses, parts[2]));
    }else if(parts.includes("save") && req.method === "POST"){
        const form = new formidable.IncomingForm();
        form.parse(req, (err, address, files) => {
            if(files.upload){
                fs.rename(files.upload.path, "assets/" +  files.upload.name, () => {
                    address["file"] = "/assets/" + files.upload.name;
                });
                addresses = saveAddress(addresses, address);
                redirect(res, "/");
            }else{
                addresses.saveAddress(addresses, address);
                redirect(res, "/");
            }
        });
    }else if(parts.includes("assets")){
        fs.readFile(__dirname + req.url, (err, data) => {
            if(err){
                res.statusCode = 404;
                res.end();
            }else{
                res.end(data);
            }
        });
    }else if(req.url === "/styles/style.css/"){
        fs.readFile(__dirname +  req.url, "utf-8", (err, data) => {
            if(err){
                res.statusCode = 404;
                res.end();
            }else{
                res.end(data);
            }
        })
    }else{
        send(res, getList(addresses));
    }
})
.listen(8080, function() {console.log("Adressbuch erreichbar unter https://localhost:8080")});

function send(res, resBody){
    res.writeHead(200, { "content-type": "text/html" });
    res.end(resBody);
}

function redirect(res, to){
    res.writeHead(302, { location: "/", "content-type": "text/plain" });
    res.end("302 Redirecting to /");
}