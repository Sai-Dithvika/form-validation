export const createEmployee = `
  INSERT INTO "EmployeeDetails"("Name", "Email", "Phone_NO", "Department", "Joining_Date", "Role")
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

export const getAllEmployees = `
  SELECT * FROM "EmployeeDetails";
`;

export const getEmployeeById = `
  SELECT * FROM "EmployeeDetails" WHERE "id" = $1;
`;

export const updateEmployee = `
  UPDATE "EmployeeDetails"
  SET "Name" = $1, "Email" = $2, "Phone_NO" = $3, "Department" = $4, "Joining_Date" = $5, "Role" = $6
  WHERE "id" = $7
  RETURNING *;
`;

export const deleteEmployee = `
  DELETE FROM "EmployeeDetails" WHERE "id" = $1;
`;

export const deleteAllEmployee = `DELETE FROM "EmployeeDetails"`;

