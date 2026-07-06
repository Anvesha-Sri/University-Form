const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.post("/register", async (req, res) => {

    console.log("REQUEST BODY:");    
    console.log(req.body);

    try {
    const {
    first_name,
    last_name,
    dob,
    course,
    personal_email,
    university_email,
    current_year,
    graduation_year,
    residence_type,
    hostel_block,
    subjects
} = req.body;

     

    const query = `

    INSERT INTO student (

    first_name,
    last_name,
    dob,
    course,
    personal_email,
    university_email,
    current_year,
    graduation_year,
    residence_type,
    hostel_block,
    subjects

        )
    VALUES (
    $1,$2,$3,$4,$5,$6,
    $7,$8,$9,$10,$11
    )

        RETURNING *
        `;

    const values = [

    first_name,
    last_name,
    dob,
    course,
    personal_email,
    university_email,
    current_year,
    graduation_year,
    residence_type,
    hostel_block,
    subjects
];
    console.log("VALUES:");
    console.log(values);
    console.log("QUERY BEING EXECUTED:");
    console.log(query);
        const result =
        await pool.query(query, values);

        res.status(201).json({

            success: true,
            student: result.rows[0]

        });

    }

    catch(err){

    console.error("========== DATABASE ERROR ==========");
    console.error(err);
    console.error("====================================");

    res.status(500).json({
        success:false,
        error: err.message
    });

}
});

app.listen(5000, () => {

    console.log(
        "Server running on port 5000"
    );

});