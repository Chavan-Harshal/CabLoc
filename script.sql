CREATE TABLE user1 (
    user_id int, 
    name varchar(20),
    PRIMARY KEY(user_id)
);

CREATE TABLE user2 (
    user_id int, 
    phono_no int, 
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES user1(user_id)
);

CREATE TABLE user3 (
    user_id int, 
    address varchar(20),
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES user2(user_id)
);

CREATE TABLE user4 (
    phone_no int, 
    name varchar(20),
    PRIMARY KEY (phone_no)
);

CREATE TABLE shifts(
    shift_id int,
    start time, 
    end time,
    PRIMARY KEY (shift_id)
);

CREATE TABLE location(
    zipcode int,
    loc_name varchar(20),
    PRIMARY KEY (zipcode)
);

CREATE TABLE driver1 (
    driver_id int,
    d_name varchar(20),
    d_phone_no int, 
    taxi_id int, 
    rating int,
    PRIMARY KEY (driver_id, taxi_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
);

CREATE TABLE driver2 (
    driver_id int, 
    d_phone_no int,
    PRIMARY KEY (driver_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
);

CREATE TABLE driver3 (
    d_phone_no int, 
    d_name varchar(20),
    PRIMARY KEY (d_phone_no)
);

CREATE TABLE garage (
    garage_id int, 
    taxi_id int, 
    status varchar(20),
    PRIMARY KEY (garage_id, taxi_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
);
 

CREATE TABLE taxi1 (
    taxi_id int,
    color varchar(20),
    number int,
    driver_id int,
    PRIMARY KEY (taxi_id, driver_id)
    -- FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
);

CREATE TABLE taxi2 (
    taxi_id int,
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

CREATE TABLE trip1 (
    trip_id int,
    start time, 
    end time, 
    duration time,
    PRIMARY KEY (trip_id)

);

CREATE TABLE trip2(
    trip_id int, 
    from_s varchar(20),
    to_d varchar(20),
    duration time,
    fare int,
    PRIMARY KEY (trip_id)
);

CREATE TABLE trip3 (
    user_id int,
    from_s varchar(20),
    to_d varchar(20),
    trip_id int,
    PRIMARY KEY (trip_id, user_id),
    FOREIGN KEY (user_id) REFERENCES user1(user_id)
);

CREATE TABLE trips4(
    trip_id int,
    rating int,
    status varchar(10),
    taxi_id int,
    driver_id int,
    PRIMARY KEY (trip_id, taxi_id, driver_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id)
);

CREATE TABLE books (
    user_id int,
    trip_id int,
    PRIMARY KEY(user_id, trip_id),
    FOREIGN KEY (user_id) REFERENCES user1(user_id),
    FOREIGN KEY (trip_id) REFERENCES trip1(trip_id)
);

CREATE TABLE works (
    driver_id int,
    shift_id int,
    PRIMARY KEY (driver_id, shift_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id),
    FOREIGN KEY (shift_id) REFERENCES shifts(shift_id)
);

CREATE TABLE drives (
    driver_id int, 
    taxi_id int,
    PRIMARY KEY (driver_id, taxi_id),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id)
);

CREATE TABLE availability (
    taxi_id int,
    zipcode int,
    PRIMARY KEY(taxi_id, zipcode),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (zipcode) REFERENCES location(zipcode)
);


CREATE TABLE present_at (
    driver_id int,
    zipcode int,
    PRIMARY KEY (driver_id, zipcode),
    FOREIGN KEY (driver_id) REFERENCES driver1(driver_id),
    FOREIGN KEY (zipcode) REFERENCES location(zipcode)
);

CREATE TABLE used_for(
    taxi_id int,
    trip_id int,
    PRIMARY KEY (taxi_id, trip_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (trip_id) REFERENCES trip1(trip_id)
);

CREATE TABLE contains (
    taxi_id int,
    garage_id int,
    PRIMARY KEY (taxi_id, garage_id),
    FOREIGN KEY (taxi_id) REFERENCES taxi1(taxi_id),
    FOREIGN KEY (garage_id) REFERENCES garage(garage_id)
);
