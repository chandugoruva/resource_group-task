const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql")
app.listen(3000,()=>{
    console.log('listening to port 3000');
})
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'employees',
    port:3306
})
connection.connect((err)=>{
if(err){
    console.log('Unable to connect to db',err);
}else{
    console.log('connected to db');
}
})
app.post("/create_user",(req,res)=>{
    const {name,email} = req.body
    const sql = 'call insert_user(?,?)'
connection.query(sql,[name,email],(err,result)=>{
    if(err){
        res.status(400).send(err)
    }else{
        res.send(result)
    }

})
})
app.post("/create_calender",(req,res)=>{
    const {calender_name,year,start_date,end_date}=req.body;
    const sql="call insert_calender_table(?,?,?,?)"
    connection.query(sql,[calender_name,year,start_date,end_date],(err,result)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.send(result)
        }
    })
})
app.post("/create_resource_group",(req,res)=>{
    const {resourceGroupName,calendarId}=req.body;
    const sql="call insert_resource_group(?,?)"
    connection.query(sql,[resourceGroupName,calendarId],(err,result)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.send(result)
        }
    })
})
app.post("/create_rg_user_ref",(req,res)=>{
    const {rgId,userId}=req.body;
    const sql="call insert_rg_user_ref(?,?)"
    connection.query(sql,[rgId,userId],(err,result)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.send(result)
        }
    })
})
app.post("/create_work_shift",(req,res)=>{
    const {workShiftName,hours,startTime,endTime,rgId}=req.body;
    const sql="call insert_work_shift(?,?,?,?,?)"
    connection.query(sql,[workShiftName,hours,startTime,endTime,rgId],(err,result)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.send(result)
        }
    })
})
app.get("/get_data_by_rg_id",(req,res)=>{
    const {rgId}=req.body;
    const sql="call get_data_by_rg_id(?)"
    connection.query(sql,[rgId],(err,result)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.send(result)
        }
    })
})
