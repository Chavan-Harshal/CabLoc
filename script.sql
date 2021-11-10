CREATE TABLE user1 (
    user_id varchar(20), 
    name varchar(20),
    PRIMARY KEY(user_id)
);

CREATE TABLE user2 (
    user_id varchar(20), 
    phono_no varchar(10), 
    PRIMARY KEY (user_id)
);

CREATE TABLE user3 (
    user_id varchar(20), 
    address varchar(20),
    PRIMARY KEY (user_id)
);

CREATE TABLE user4 (
    phone_no varchar(10), 
    name varchar(20),
    PRIMARY KEY (phone_no)
);

CREATE TABLE shifts(
    shift_id varchar(20),
    start time, 
    end time,
    PRIMARY KEY (shift_id)
);

CREATE TABLE location(
    zipcode int,
    loc_name varchar(20),
    PRIMARY KEY (zipcode)
);

CREATE TABLE taxi1 (
    taxi_id varchar(20),
    color varchar(20),
    number int,
    driver_id varchar(20),
    model varchar(20),
    PRIMARY KEY (taxi_id)
    -- FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
);

CREATE TABLE taxi2 (
    taxi_id varchar(20),
    model varchar(20),
    PRIMARY KEY(taxi_id),
    FOREIGN KEY(taxi_id) REFERENCES taxi1(taxi_id)
);

CREATE TABLE taxi3 (
    model varchar(20),
    capacity int, 
    class varchar(20),
    PRIMARY KEY (model)

);

CREATE TABLE driver1 (
    driver_id varchar(20),
    d_name varchar(20),
    d_phone_no varchar(10), 
    taxi_id varchar(20), 
    rating int,
    PRIMARY KEY (driver_id, taxi_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
);

CREATE TABLE driver2 (
    driver_id varchar(20), 
    d_phone_no varchar(10),
    PRIMARY KEY (driver_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
);

CREATE TABLE driver3 (
    d_phone_no varchar(10), 
    d_name varchar(20),
    PRIMARY KEY (d_phone_no)
);

CREATE TABLE garage (
    garage_id varchar(20), 
    taxi_id varchar(20), 
    status varchar(20),
    PRIMARY KEY (garage_id, taxi_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
);
 



CREATE TABLE trip1 (
    trip_id varchar(20),
    start time, 
    end time, 
    duration time,
    PRIMARY KEY (trip_id)

);

CREATE TABLE trip2(
    trip_id varchar(20), 
    from_s varchar(20),
    to_d varchar(20),
    duration time,
    fare int,
    PRIMARY KEY (trip_id)
);

CREATE TABLE trip3 (
    user_id varchar(20),
    from_s varchar(20),
    to_d varchar(20),
    trip_id varchar(20),
    PRIMARY KEY (trip_id, user_id),
    FOREIGN KEY (user_id) REFERENCES user1(user_id)
);

CREATE TABLE trip4(
    trip_id varchar(20),
    rating int,
    status varchar(10),
    taxi_id varchar(20),
    driver_id varchar(20),
    PRIMARY KEY (trip_id, taxi_id, driver_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
);

CREATE TABLE books (
    user_id varchar(20),
    trip_id varchar(20),
    PRIMARY KEY(user_id, trip_id)
    -- FOREIGN KEY (user_id) REFERENCES user1(user_id),
    -- FOREIGN KEY (trip_id) REFERENCES trip1(trip_id)
);

CREATE TABLE works (
    driver_id varchar(20),
    shift_id varchar(20),
    PRIMARY KEY (driver_id, shift_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
    -- FOREIGN KEY (shift_id) REFERENCES shifts(shift_id)
);

CREATE TABLE drives (
    driver_id varchar(20), 
    taxi_id varchar(20),
    PRIMARY KEY (driver_id, taxi_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
);

CREATE TABLE availability (
    taxi_id varchar(20),
    zipcode int,
    PRIMARY KEY(taxi_id, zipcode),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
    -- FOREIGN KEY (zipcode) REFERENCES location(zipcode)
);


CREATE TABLE present_at (
    driver_id varchar(20),
    zipcode int,
    PRIMARY KEY (driver_id, zipcode),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
    -- FOREIGN KEY (zipcode) REFERENCES location(zipcode)
);

CREATE TABLE used_for(
    taxi_id varchar(20),
    trip_id varchar(20),
    PRIMARY KEY (taxi_id, trip_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (trip_id) REFERENCES trip1(trip_id)
);

CREATE TABLE contains (
    taxi_id varchar(20),
    garage_id varchar(20),
    PRIMARY KEY (taxi_id, garage_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (garage_id) REFERENCES garage(garage_id)
);

