const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use(authRoutes);
app.use("/admin",adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(PORT, "portuna başarılı şekilde bağlandı.")
})