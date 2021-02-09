class Tables {
    init = (connection) => {
        this.connection = connection;
    }

    createAssessmentsTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS assessments (
            id INT NOT NULL,
            class_id INT NOT NULL,
            type VARCHAR(20) NOT NULL,
            start DATETIME NOT NULL,
            end DATETIME NOT NULL,
            weight INT NOT NULL,
            total_exercises INT NOT NULL,
            session INT(1) NOT NULL DEFAULT 1, 
            PRIMARY KEY(id),
            FOREIGN KEY(class_id) REFERENCES classes(id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Assessments table ok");
            }
        });
    }

    createClassesTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS classes (
            id INT NOT NULL,
            semester VARCHAR(6) NOT NULL, 
            PRIMARY KEY (id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Classes Table ok");
            }
        });
    }

    createUsersTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL,
            class_id INT NOT NULL,
            course_id INT NOT NULL,
            course_name VARCHAR(50) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (class_id) REFERENCES classes(id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Users Table ok");
            }
        });
    }

    createQuestionsTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS questions (
            id INT NOT NULL,
            assessment_id INT NOT NULL,
            class_id INT NOT NULL,
            user_id INT NOT NULL,
            logins INT NOT NULL DEFAULT 0,
            comments INT NOT NULL DEFAULT 0,
            blank_line INT NOT NULL DEFAULT 0,
            lloc INT NOT NULL DEFAULT 0,
            sloc INT NOT NULL DEFAULT 0,
            count_if INT NOT NULL DEFAULT 0,
            count_loop INT NOT NULL DEFAULT 0,
            count_var INT NOT NULL DEFAULT 0,
            syntax_grade INT NOT NULL DEFAULT 0,
            log_rows INT NOT NULL DEFAULT 0,
            count_delete INT NOT NULL DEFAULT 0,
            writed INT NOT NULL DEFAULT 0,
            pasted INT NOT NULL DEFAULT 0,
            focus_time FLOAT NOT NULL DEFAULT 0,
            writed_time FLOAT NOT NULL DEFAULT 0,
            deleted_time FLOAT NOT NULL DEFAULT 0,
            pasted_time FLOAT NOT NULL DEFAULT 0,
            early_often FLOAT NOT NULL DEFAULT 0,
            procastination INT NOT NULL DEFAULT 0,
            tested INT NOT NULL DEFAULT 0,
            submited INT NOT NULL DEFAULT 0,
            is_rigth INT(1) NOT NULL DEFAULT 0,
            wrong_submit INT NOT NULL DEFAULT 0,
            grade INT(3) NOT NULL DEFAULT 0,
            syntax_error INT NOT NULL DEFAULT 0,
            jadud INT NOT NULL DEFAULT 0,
            amount_of_change INT NOT NULL DEFAULT 0,
            PRIMARY KEY (id, assessment_id, class_id, user_id),
            FOREIGN KEY (assessment_id) REFERENCES assessments(id),
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Questions Table ok");
            }
        });
    }

    createGradesTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS grades (
            assessment_id INT NOT NULL,
            class_id INT NOT NULL,
            user_id INT NOT NULL,
            grade FLOAT NOT NULL,
            correct INT NOT NULL,
            incorrect INT NOT NULL,
            blank INT NOT NULL,
            PRIMARY KEY(assessment_id, class_id, user_id),
            FOREIGN KEY (assessment_id) REFERENCES assessments(id),
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Grades Table ok");
            }
        });
    }

    createFinalGradesTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS final_grade (
            class_id INT NOT NULL,
            user_id INT NOT NULL,
            grade FLOAT NOT NULL,
            PRIMARY KEY(class_id, user_id),
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Final Grade Table ok");
            }
        });
    }

    createPredictionsTable = () => {
        const sql = 
        `CREATE TABLE IF NOT EXISTS predictions (
            user_id INT NOT NULL,
            class_id INT NOT NULL,
            session INT(1) NOT NULL DEFAULT 1,
            logins DOUBLE NOT NULL DEFAULT 0,
            comments DOUBLE NOT NULL DEFAULT 0,
            blank_line DOUBLE NOT NULL DEFAULT 0,
            lloc DOUBLE NOT NULL DEFAULT 0,
            sloc DOUBLE NOT NULL DEFAULT 0,
            count_if DOUBLE NOT NULL DEFAULT 0,
            count_loop DOUBLE NOT NULL DEFAULT 0,
            count_var DOUBLE NOT NULL DEFAULT 0,
            syntax_grade DOUBLE NOT NULL DEFAULT 0,
            log_rows DOUBLE NOT NULL DEFAULT 0,
            deleted_coef DOUBLE NOT NULL DEFAULT 0,
            writed_coef DOUBLE NOT NULL DEFAULT 0,
            pasted_coef DOUBLE NOT NULL DEFAULT 0,
            focus_time DOUBLE NOT NULL DEFAULT 0,
            writed_time DOUBLE NOT NULL DEFAULT 0,
            early_often DOUBLE NOT NULL DEFAULT 0,
            error_coef DOUBLE NOT NULL DEFAULT 0,
            submit_coef DOUBLE NOT NULL DEFAULT 0,
            jadud DOUBLE NOT NULL DEFAULT 0,
            amount_of_change DOUBLE NOT NULL DEFAULT 0,
            procastination DOUBLE NOT NULL DEFAULT 0,
            correct DOUBLE NOT NULL DEFAULT 0,
            incorrect DOUBLE NOT NULL DEFAULT 0,
            blank DOUBLE NOT NULL DEFAULT 0,
            homework_grade DOUBLE NOT NULL DEFAULT 0,
            exam_grade DOUBLE NOT NULL DEFAULT 0,
            passed_probability FLOAT NOT NULL DEFAULT 0,
            grade_regression FLOAT NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, class_id, session),
            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;
        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Predictions Table ok");
            }
        });
    }

    createTables = () => {
        this.createClassesTable();
        this.createAssessmentsTable();
        this.createUsersTable();
        this.createQuestionsTable();
        this.createGradesTable();
        this.createFinalGradesTable();
        this.createPredictionsTable();
    }
}

module.exports = Tables;