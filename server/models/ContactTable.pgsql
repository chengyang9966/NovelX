CREATE TABLE IF NOT EXISTS contact (
  contacid serial PRIMARY KEY,
  address1 character varying(255) NULL,
  address2 character varying(255) NULL,
  city character varying(50) NULL,
  state character varying(60) NULL,
  postcode character varying(10) NULL,
  phonenumber character varying(15) NULL,
  dob date NULL,
  username character varying(255) NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  userid int not null
)

ALTER TABLE contact ADD constraint UserContactId
  FOREIGN KEY (userid) 
   REFERENCES users(id)