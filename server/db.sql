CREATE TABLE data (
	stamp TIMESTAMP WITHOUT TIME ZONE,
	moisture FLOAT,
	light FLOAT,
	temperature FLOAT,
  humidity FLOAT
);

CREATE TABLE thresholds (
	min_moisture INT,
	max_moisture INT,
	min_light INT,
	max_light INT,
	min_temperature INT,
	max_temperature INT,
	min_humidity INT,
	max_humidity INT
);