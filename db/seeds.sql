INSERT INTO department (id, name)
    VALUES
    (1, 'Engineering'),
    (2, 'Finance'),
    (3, 'Legal'),
    (4, 'Sales');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
    (1, 'Dennis', 'Littlefield', 1, NULL),
    (2, 'Althea', 'Hanson', 2, 1),
    (3, 'Rabia', 'Saeed', 3, NULL),
    (4, 'Raymond', 'Little', 4, 3),
    (5, 'Barb', 'Townsend', 5, NULL),
    (6, 'Topaz', 'Morkie', 6, 5),
    (7, 'Saad', 'Lamri', 7, NULL),
    (8, 'Serge', 'LAfricain', 8, 7);

INSERT INTO role (id, title, salary, department_id)
    VALUES
    (1, 'Sales Lead', 10000, 4),
    (2, 'Salesperson', 80000, 4),
    (3, 'Lead Engineer', 150000, 1),
    (4, 'Software Engineer', 120000, 1),
    (5, 'Account Manager', 160000, 2),
    (6, 'Accountant', 125000, 2),
    (7, 'Legal Team Lead', 250000, 3),
    (8, 'Lawyer', 190000, 3);
  