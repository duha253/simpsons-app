DROP TABLE IF EXISTS quotee;
CREATE TABLE quotee(
id SERIAL PRIMARY KEY,
 quote varchar(255),
  character varchar(255),
  image varchar(255),
 characterDirection varchar(255),
 created_by varchar(255)

);
