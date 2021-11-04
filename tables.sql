CREATE TABLE users(
    users_id VARCHAR(10),
    names VARCHAR(50),
    address VARCHAR(50),
    phone_no VARCHAR(15),
    PRIMARY KEY(users_id)
);

CREATE TABLE taxis(
    taxi_id VARCHAR(10),
    driver_id VARCHAR(10),
    model VARCHAR(20),
    colour VARCHAR(15),
    taxi_no VARCHAR(15),
    class VARCHAR(15),
    capacity INT CHECK(capacity>0),
    PRIMARY KEY(taxi_id)
);

CREATE TABLE drivers(
    driver_id VARCHAR(10),
    names VARCHAR(50),
    phone_no VARCHAR(15),
    taxi_id VARCHAR(10),
    rating int CHECK (rating>0 and rating<5),
    PRIMARY KEY(driver_id),
    FOREIGN KEY (taxi_id) REFERENCES taxis(taxi_id)
);

ALTER TABLE taxis ADD FOREIGN KEY (driver_id) REFERENCES drivers(driver_id);


CREATE TABLE locations(
    pincode VARCHAR(6),
    location_name VARCHAR(50),
    PRIMARY KEY(pincode)
);

CREATE TABLE trips(
    trip_id VARCHAR(10),
    driver_id VARCHAR(10),
    taxi_id VARCHAR(10),
    users_id VARCHAR(10),
    from_zip VARCHAR(6),
    to_zip VARCHAR(6),
    trip_status VARCHAR(15),
    fare int NOT NULL,
    rating int,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    duration NUMERIC(4,2),
    PRIMARY KEY(trip_id),
    FOREIGN KEY(driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY(taxi_id) REFERENCES taxis(taxi_id),
    FOREIGN KEY(users_id) REFERENCES users(users_id)
);

CREATE TABLE shifts(
    shift_id varchar(10),
    shift_start TIMESTAMP,
    shift_end TIMESTAMP,
    PRIMARY KEY(shift_id)
);

CREATE TABLE garage(
    garage_id VARCHAR(10),
    vehicle_status VARCHAR(30),
    PRIMARY KEY(garage_id)
);

CREATE TABLE booking(
    trip_id VARCHAR(10),
    users_id VARCHAR(10),
    PRIMARY KEY(trip_id,users_id),
    FOREIGN KEY(trip_id) REFERENCES trips(trip_id),
    FOREIGN KEY(users_id) REFERENCES users(users_id)
);

CREATE TABLE works(
    driver_id VARCHAR(10),
    shift_id VARCHAR(10),
    PRIMARY KEY(driver_id,shift_id),
    FOREIGN KEY(driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY(shift_id) REFERENCES shifts(shift_id)
);

CREATE TABLE drives(
    driver_id VARCHAR(10),
    taxi_id VARCHAR(10),
    PRIMARY KEY(driver_id,taxi_id),
    FOREIGN KEY(driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY(taxi_id) REFERENCES taxis(taxi_id)
);

CREATE TABLE availabilities(
    taxi_id VARCHAR(10),
    pincode varchar(6),
    PRIMARY KEY(taxi_id,pincode),
    FOREIGN KEY(pincode) REFERENCES locations(pincode),
    FOREIGN KEY(taxi_id) REFERENCES taxis(taxi_id)
);

CREATE TABLE present_at(
    driver_id VARCHAR(10),
    pincode VARCHAR(6),
    PRIMARY KEY(driver_id,pincode),
    FOREIGN KEY(driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY(pincode) REFERENCES locations(pincode)
);

CREATE TABLE used_for(
    taxi_id VARCHAR(10),
    trip_id VARCHAR(10),
    PRIMARY KEY(taxi_id,trip_id),
    FOREIGN KEY(taxi_id) REFERENCES taxis(taxi_id),
    FOREIGN KEY(trip_id) REFERENCES trips(trip_id)
);

CREATE TABLE contain(
    taxi_id VARCHAR(10),
    garage_id VARCHAR(10),
    PRIMARY KEY(taxi_id,garage_id),
    FOREIGN KEY(taxi_id) REFERENCES taxis(taxi_id),
    FOREIGN KEY(garage_id) REFERENCES garage(garage_id)
);
