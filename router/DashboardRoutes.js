const express=require("express")
const Route=express.Router()
const {CourseData,StudentDetails}=require("../controller/DashboardController")
Route.get("/CourseData",CourseData)
Route.get("/StudentDetails",StudentDetails)

module.exports=Route