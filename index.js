const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const users = [];
app.get("/", (req, res) => {
    res.json({data:users});
    
})
app.post("/post", (req, res) => {
    const username = req.body.username;
    const age = req.body.age;
    users.push({name: username, age: age })
    res.json({ message:"users added succesfully in to users array" });
   
    
})
app.put("/put", (req, res) => {
    const username = req.body.username;
    let  usermodified= users.map(user => {
        if (user.name === username) {
            return { ...user, age: "50" };
        }
        return user;
    })
    users.splice(0, users.length, ...usermodified);
    res.json({
        message: "user updated succesfully"
    });
})
app.patch("/patch", (req, res) => {
    const username = req.body.username;
    let  userpatched= users.map(user => {
        if (user.name === username) {
            return { ...user, id:"1" };
        }
        return user;
    })
    users.splice(0, users.length, ...userpatched);
    res.json({
        message: "user data added extra succesfully succesfully"
    });
    
})
app.delete("/delete", (req, res) => {
    const username = req.body.username;
    const index = users.findIndex(user => user.name === username);

    if (index !== -1) {
        users.splice(index, 1);
        res.json({
            message: "User deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

app.listen(2000, () => {
    console.log("server starting succesfully");
})