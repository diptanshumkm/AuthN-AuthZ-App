The NodeJS application facilitates user sign-up and login with JWT-based authentication and data storage in MongoDB. Passwords are securely hashed using bcrypt before being stored. Upon successful login, a JWT is generated.

The application features three middleware functions: auth, isStudent, and isAdmin. These ensure secure access control:

auth: Verifies the presence and validity of the JWT.
isStudent: Checks if the authenticated user has student privileges.
isAdmin: Checks if the authenticated user has admin privileges.
Two protected routes, /student and /admin, require valid JWT tokens:

/student: Accessible only to authenticated users with student roles.

/admin: Accessible only to authenticated users with admin roles.

For authentication, the token is extracted from req.body. The login process involves verifying user credentials, generating a JWT, and saving relevant data in MongoDB. This structure ensures secure and role-based access control, leveraging JWT for authentication and bcrypt for password security.
