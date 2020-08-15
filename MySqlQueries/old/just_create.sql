DROP SCHEMA IF EXISTS hours_records; 
#Создаю БД.
CREATE SCHEMA hours_records; 
#Создаю таблицы.
USE hours_records; 

CREATE TABLE hours_records.tb_permit
( id_permit tinyint unsigned NOT NULL, 
permit varchar(255) NOT NULL,
CONSTRAINT PK_permit PRIMARY KEY(id_permit)
);
 
CREATE TABLE hours_records.tb_role
( id_role tinyint unsigned NOT NULL, 
role_title varchar(40) NOT NULL, 
CONSTRAINT PK_role PRIMARY KEY(id_role)
);
 
CREATE TABLE hours_records.tb_manage_permit
( id_manage_permit tinyint unsigned NOT NULL, 
id_permit tinyint unsigned NOT NULL, 
id_role tinyint unsigned NOT NULL, 
CONSTRAINT PK_manage_permit PRIMARY KEY(id_manage_permit),
CONSTRAINT FK_permit_manage_permit FOREIGN KEY (id_permit)
REFERENCES tb_permit(id_permit),
CONSTRAINT FK_role_manage_permit FOREIGN KEY (id_role)
REFERENCES tb_role(id_role)
);
 
CREATE TABLE hours_records.tb_user
( id_user int unsigned NOT NULL, 
id_manage_permit tinyint unsigned NOT NULL, 
user_login varchar(40), 
user_password varchar(40), 
user_desc varchar(255),
CONSTRAINT PK_user PRIMARY KEY(id_user),
CONSTRAINT FK_manage_permit_user FOREIGN KEY (id_manage_permit)
REFERENCES tb_manage_permit(id_manage_permit)
);

CREATE TABLE hours_records.tb_type_press
( id_type_press int unsigned NOT NULL, 
type_press_title varchar(30) NOT NULL, 
CONSTRAINT PK_type_press PRIMARY KEY(id_type_press)
);
 
CREATE TABLE hours_records.tb_status_work
( id_status_work tinyint unsigned NOT NULL, 
status_work_title varchar(20) NOT NULL, 
CONSTRAINT PK_status_work PRIMARY KEY(id_status_work)
);
 
CREATE TABLE hours_records.tb_task
( id_task int unsigned NOT NULL,
# заказчик
id_user int unsigned NOT NULL, 
task_title varchar(255) NOT NULL,
# тип: почасовая или фиксированная оплата
payment_type bool NOT NULL,
# почасовая ставка или фиксированная оплата
rate decimal(8,2) NOT NULL,
CONSTRAINT PK_task PRIMARY KEY(id_task),
CONSTRAINT FK_user_task FOREIGN KEY (id_user)
REFERENCES tb_user(id_user)
);
 
# Работники (много работников закреплены за многими задачами)
CREATE TABLE hours_records.tb_worker
( id_worker int unsigned NOT NULL, 
id_task int unsigned NOT NULL, 
id_user int unsigned NOT NULL, 
CONSTRAINT PK_worker PRIMARY KEY(id_worker),
CONSTRAINT FK_task_worker FOREIGN KEY (id_task)
REFERENCES tb_task(id_task),
CONSTRAINT FK_user_worker FOREIGN KEY (id_user)
REFERENCES tb_user(id_user)
);
 
CREATE TABLE hours_records.tb_work
( id_work int unsigned NOT NULL, 
id_worker int unsigned NOT NULL, 
id_status_work tinyint unsigned NOT NULL DEFAULT 0,
work_resource_title varchar(255),
work_datetime datetime NOT NULL, 
work_period varchar(6),
screenshot BLOB, #image,
CONSTRAINT PK_work PRIMARY KEY(id_work),
CONSTRAINT FK_worker_work FOREIGN KEY (id_worker)
REFERENCES tb_worker(id_worker),
CONSTRAINT FK_status_work_work FOREIGN KEY (id_status_work)
REFERENCES tb_status_work(id_status_work)
);
 
CREATE TABLE hours_records.tb_press
( id_press int unsigned NOT NULL, 
id_work int unsigned NOT NULL, 
id_type_press int unsigned NOT NULL, 
count_press int unsigned DEFAULT 1, 
CONSTRAINT PK_press PRIMARY KEY(id_press),
CONSTRAINT FK_press_work FOREIGN KEY (id_work)
REFERENCES tb_work(id_work),
CONSTRAINT FK_press_type_press FOREIGN KEY (id_type_press)
REFERENCES tb_type_press(id_type_press)
);
 
CREATE TABLE hours_records.tb_week_work
( id_week_work int unsigned NOT NULL, 
id_worker int unsigned NOT NULL, 
begin_date date,
time_ok real DEFAULT 0,
time_not_ok real DEFAULT 0,
time_not_watch real DEFAULT 0,
rate decimal(8,2),
reward decimal(8,2),
CONSTRAINT PK_week_work PRIMARY KEY(id_week_work),
CONSTRAINT FK_worker_week_work FOREIGN KEY (id_worker)
REFERENCES tb_worker(id_worker)
);
