CREATE TABLE IF NOT EXISTS request(
    request_id           INTEGER PRIMARY KEY,
    request_type         INTEGER NOT NULL,
    request_status       INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS newLicense(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id           INTEGER NOT NULL,
    company_name         Text  NOT NULL,
    licence_type         Text  NOT NULL,
    is_office            Text NOT NULL,
    office_name          Text NOT NULL,
    office_service_number Text  NOT NULL,
    request_date         DATE  NOT NULL,
    activities          Text  NOT NULL,
    FOREIGN KEY(request_id) REFERENCES request(request_id)
);

CREATE TABLE IF NOT EXISTS accountRequest(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id           INTEGER NOT NULL,
    company_name         Text  NOT NULL,
    requester_name       Text  NOT NULL,
    applicant_name       Text  NOT NULL,
    user_name            Text  NOT NULL,
    contact_email        Text  NOT NULL,
    permissions          Text  NOT NULL,
    FOREIGN KEY(request_id) REFERENCES request(request_id)
);
CREATE TABLE IF NOT EXISTS inspectionRequest(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id           INTEGER NOT NULL,
    company_name         Text  NOT NULL,
    inspection_date      DATE NOT NULL,
    inspection_time      TIME NOT NULL,
    inspection_type      Text  NOT NULL,
    FOREIGN KEY(request_id) REFERENCES request(request_id)
);
CREATE TABLE IF NOT EXISTS addNewActivity(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id           INTEGER NOT NULL,
    company_name         Text  NOT NULL,
    licence_id           Text  NOT NULL,
    activities           Text  NOT NULL,
    FOREIGN KEY(request_id) REFERENCES request(request_id)
);
CREATE TABLE IF NOT EXISTS stampLicenseLetter(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id           INTEGER NOT NULL,
    company_name         Text  NOT NULL,
    licence_id           Text  NOT NULL,
    request_date         DATE NOT NULL,
    FOREIGN KEY(request_id) REFERENCES request(request_id)
);

