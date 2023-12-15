const express = require('express');

const app = express()

app.use((req, res, next) => {
    const info = [
        `>>> ${new Date().toISOString()}`,
        `${req.method} ${req.path}`,
        ...Object.keys(req.headers).map(key => `${key}: ${req.headers[key]}`)
    ]
    
    req.on("data", (chunk) => {
        info.push(chunk.toString('utf-8'));
    })

    req.on("end", () => {
        res.status(202)
        res.end()    
        
        info.push(`<<< ${new Date().toISOString()}`)
        
        console.log(info.join("\n"))
    });

});

app.listen(9999)