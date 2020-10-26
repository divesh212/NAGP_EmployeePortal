# NAGP_EmployeePortal

## API

### 1) Register

Method- `GET` <br/>
URL: `/register` <br/>
Registers the new user with the provided username, password and role (Manager/Employee). After successful registration, the user credentials are saved in the *users* collection with the hashed password and the user will be redirected to the login page.

### 2) Login

Method- `GET` <br/>
URL: `/login` <br/>
Renders the login page for the users where the registered users can use their credentials and enter the portal. Cookies are cleared when this URL is invoked.

Method- `POST` <br/>
URL: `/login` <br/>
Payload: `{username: "", password: ""}` <br/>
The username and password received in the payload are matched with that in the database. If the credentails match, the user is allowed access to the portal and is redirected to `/openings` page where the list of openings is visible. On successful login, a JWT is set in the cookie and sent back to client. This cookie will not be  sent back to the server from the client in subsequent requests (eg. opening details, apply for opening, update opening). If the login is unsucessful, relevant error page is displayed with a relevant message.

### 3) List Openings

Method- `GET` <br/>
URL: `/openings` <br/>
Lists all the openings which are "OPEN" and the users can apply to an opening and also view its details. If the user is a manager, the openings that are closed are also listed with the status of every opening. The manager can aslo add/update and opening. Both ADD and UPDATE opening buttons are hidden for an Employee.

### 4) Opening Details

Method- `GET` <br/>
URL: `/openings/{id}` <br/>
Details of the opening are displayed by fetching them from the database using the unique opening identifier. The user can also apply for an opening here. If the user is a manager, he/she can also update it.

### 5) Apply

Method- `POST` <br/>
URL: `/openings/apply/{id}` <br/>
The user can apply to an opening by clicking on the "Apply" button alongside the opening in the List of Openings page or from the Opening Details page. The user can apply to an opening only once and no error is displayed if he click on the Apply button again. However, his usename will get added in the "appliedUsers" field for an opening only once for that partiuclar opening in the collection.
The manager that had created the opening gets a notification if some user applies for that particular opening. This notification is currently only logged at server side.

### 6) Add Opening

Method- `GET` <br/>
URL: `/openings/add` <br/>
An opening can only be added by a manager. A form is displayed where the manager can enter the details of the opening and click on the Add button to add the opening in the database.

Method- `POST` <br/>
URL: `/openings/add` <br/>
The details of the opening are received in the payload and inserted into the `openings` collection.

### 7) Update Opening

Method- `GET` <br/>
URL: `/openings/add/{id}` <br/>
An opening can only be updated by a manager. A form is displayed where the manager can update the details of the opening and click on the Update button to update the opening in the database. The default from values are populated with the original values of the opening.

Method- `POST` <br/>
URL: `/openings/add` <br/>
The updated details of the opening are received in the payload and upserted into the `openings` collection. If the opening was open and is now closed after the update, the users that are present in the "appliedUsers" field receive a notification for the same. This notification is currently only logged at server side.
