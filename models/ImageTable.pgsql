create table images
(
id serial primary key,
imageurl character varying (255) not null,
name character varying(100) NULL,
type character varying(10) NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP  null,
userid int not null
)

ALTER TABLE images ADD constraint UserImagesId
  FOREIGN KEY (userid) 
   REFERENCES users(id)
   