create table users(
	id serial primary key,
	fname  VARCHAR (25) not null,
	lname VARCHAR (25) not null,
	email VARCHAR(100) not null,
	password  VARCHAR (25) not null,
	roleId INT NOT NULL,
	FOREIGN KEY (roleId)
      REFERENCES roles (id)
);
ADD CONSTRAINT fk_users_role
FOREIGN KEY (roleId)
      REFERENCES roles (id)