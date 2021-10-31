CREATE TABLE IF NOT EXISTS holiday (
  holidayId serial PRIMARY KEY,
  startDay character varying(255) NULL,
  startMonth character varying(255) NULL,
  startYear character varying(50) NULL,
  name character varying(200) NULL,
  endDay character varying(255) NULL,
  endMonth character varying(255) NULL,
  endYear character varying(50) NULL
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
)