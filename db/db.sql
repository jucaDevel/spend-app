DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    lastname VARCHAR(180) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image VARCHAR(250) NULL,
    session_token VARCHAR(250) NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS role CASCADE;
CREATE TABLE role(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    image VARCHAR(250) NULL,
    route VARCHAR(250) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_role CASCADE;
CREATE TABLE user_has_role(
    id_user BIGSERIAL NOT NULL,
    id_role BIGSERIAL NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_role) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS category CASCADE;
CREATE TABLE category(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(250) NOT NULL,
    id_type BIGSERIAL NOT NULL,
    id_user BIGSERIAL NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (id_type) REFERENCES type(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS type CASCADE;
CREATE TABLE type(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(250) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
    image VARCHAR(250) NULL
);

DROP TABLE IF EXISTS transaction CASCADE;
CREATE TABLE transaction(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    price DECIMAL(30) DEFAULT 0,
    id_category BIGSERIAL NOT NULL,
    id_type BIGSERIAL NOT NULL,
    id_user BIGSERIAL NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_type) REFERENCES type(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

);