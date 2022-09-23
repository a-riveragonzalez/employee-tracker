INSERT INTO department (name)
VALUES ("Custom Framing"),
       ("Fine Arts"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Framer", 23.00, 1),
       ("Framing Manager", 25.00, 1),
       ("Artist Expert", 24.00, 2),
       ("Art Manager", 25.00, 2),
       ("Sales Associate", 22.00, 3),
       ("Customer Service Manager", 25.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Roy", "Mustang", 2, NULL),
       ("Riza", "Hawkeye", 4, NULL),
       ("Izumi", "Curtis", 6, NULL),
       ("Edward", "Elric", 1, 1),
       ("Winry", "Rockbell", 3, 2),
       ("Alphonse", "Elric", 5, 3);