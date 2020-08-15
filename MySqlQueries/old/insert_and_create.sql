DROP SCHEMA IF EXISTS hours_records; 
#Создаю БД.
CREATE SCHEMA hours_records; 
#Создаю таблицы.

CREATE TABLE hours_records.tb_type_press
( id_type_press varchar(2) NOT NULL AUTO_INCREMENT, 
type_press_title varchar(40) NOT NULL, 
CONSTRAINT PK_type_press PRIMARY KEY(id_type_press)
);

INSERT INTO hours_records.tb_type_press VALUES 
('Нажатие правой кнопки мыши'), 
('Нажатие левой кнопки мыши'),
('Нажатие колесика мыши'),
('Нажатие буквенных кнопок на клавиатуре'),
('Нажатие цифровых кнопок на клавиатуре'),
('Нажатие специальных кнопок на клавиатуре'),
('Нажатие стрелок на клавиатуре');

CREATE TABLE hours_records.tb_status_work
( id_status_work varchar(1) NOT NULL AUTO_INCREMENT, 
status_work_title varchar(20) NOT NULL, 
CONSTRAINT PK_status_work PRIMARY KEY(id_status_work)
);

INSERT INTO hours_records.tb_status_work VALUES 
('Не оцененная'), 
('Одобренная'),
('Не одобренная');

CREATE TABLE hours_records.tb_user
( id_user varchar(5) NOT NULL AUTO_INCREMENT, 
user_login varchar(40) NOT NULL, 
user_password varchar(40) NOT NULL, 
user_fio varchar(240) NOT NULL,
CONSTRAINT PK_user PRIMARY KEY(id_user)
);

INSERT INTO hours_records.tb_user VALUES 
# Это будет просто заказчик. 
('ivan', '1', 'Барсук Иван Петрович'),
# Это будет и заказчик, и исполнитель.
('dmitriy', '1', 'Папоротник Дмитрий Афанасьевич'),
# Это будет просто исполнитель.
('alice', '1', 'Мельникова Алиса Владимировна');

CREATE TABLE hours_records.tb_task
( id_task varchar(4) NOT NULL AUTO_INCREMENT,
# заказчик
id_user varchar(5) NOT NULL, 
task_title varchar(100) NOT NULL,
# тип: фиксированная (0) или почасовая (1) оплата
payment_type varchar(1) NOT NULL,
# фиксированная оплата или почасовая ставка
rate real NOT NULL,
CONSTRAINT PK_task PRIMARY KEY(id_task),
CONSTRAINT FK_user_task FOREIGN KEY (id_user)
REFERENCES tb_user(id_user)
);
 
INSERT INTO hours_records.tb_task VALUES 
# Заказ юзера 1 под названием "<название>" с фиксированной оплатой в 50000.00
('1', 'Пошаговая игра "Дремучий лес"', '0', '50000.00'),
# Заказ юзера 1 под названием "<название>" с почасовой оплатой в 300.00
('1', 'Умный будильник StandUp!', '1', '300.00'),
('2', 'Переводчик FastEnglish', '1', '100.24');

# Работники (много работников закреплены за многими задачами)
CREATE TABLE hours_records.tb_performer
( id_performer varchar(5) NOT NULL AUTO_INCREMENT, 
id_task varchar(4) NOT NULL, 
id_user varchar(5) NOT NULL, 
CONSTRAINT PK_performer PRIMARY KEY(id_performer),
CONSTRAINT FK_task_performer FOREIGN KEY (id_task)
REFERENCES tb_task(id_task),
CONSTRAINT FK_user_performer FOREIGN KEY (id_user)
REFERENCES tb_user(id_user)
);

INSERT INTO hours_records.tb_performer VALUES 
('1', '3'),
('3', '2'),
('1', '2');
 
CREATE TABLE hours_records.tb_work
( id_work varchar(7) NOT NULL AUTO_INCREMENT, 
id_performer varchar(5) NOT NULL, 
id_status_work varchar(1) NOT NULL DEFAULT 0,
work_resource_title varchar(240),
work_datetime datetime NOT NULL, 
work_period int,
screenshot BLOB, #image,
CONSTRAINT PK_work PRIMARY KEY(id_work),
CONSTRAINT FK_performer_work FOREIGN KEY (id_performer)
REFERENCES tb_performer(id_performer),
CONSTRAINT FK_status_work_work FOREIGN KEY (id_status_work)
REFERENCES tb_status_work(id_status_work)
);
 
INSERT INTO hours_records.tb_work VALUES 
# date @date = 'YYYY-MM-DD' 
('1', '0', 'Wikipedia', '01-02-2016 12:45:20', 5, NULL),
('1', '0', 'MySQL Workbench', '01-02-2016 12:55:20', 7, NULL),
('1', '1', 'переводчик', '01-02-2016 13:05:20', 8, NULL),
('1', '2', 'Index | Node.js Documentation', '01-02-2016 15:00:54', 6, NULL),
('1', '0', 'MS Visual Studio', '01-02-2016 15:10:54', 7, NULL);

CREATE TABLE hours_records.tb_press
( id_press varchar(7) NOT NULL AUTO_INCREMENT, 
id_work varchar(7) NOT NULL, 
id_type_press varchar(2) NOT NULL, 
count_press varchar(4) NOT NULL, 
CONSTRAINT PK_press PRIMARY KEY(id_press),
CONSTRAINT FK_press_work FOREIGN KEY (id_work)
REFERENCES tb_work(id_work),
CONSTRAINT FK_press_type_press FOREIGN KEY (id_type_press)
REFERENCES tb_type_press(id_type_press)
);

# Уточнить, как считываются нажатия.
INSERT INTO hours_records.tb_press VALUES 
('5','7','4572'),
('5','1','1245'),
('5','2','1231'),
('5','3','1896'),
('5','4','3456'),
('5','5','1245'),
('5','6','4725'),
('1','7','4572'),
('1','1','1245'),
('1','2','1231'),
('1','3','1896'),
('1','4','3456'),
('1','5','1245'),
('2','7','4572'),
('2','1','1245'),
('2','2','1231'),
('2','4','3456'),
('2','5','1245'),
('2','6','4725'),
('3','7','4572'),
('3','1','1245'),
('3','2','1231'),
('3','3','1896'),
('3','4','3456'),
('3','5','1245'),
('4','7','4572'),
('4','1','1245'),
('4','2','1231'),
('4','3','1896'),
('4','4','3456'),
('4','5','1245');
 
 # Добавить данные.
CREATE TABLE hours_records.tb_week_work
( id_week_work varchar(7) NOT NULL AUTO_INCREMENT, 
id_performer varchar(5) NOT NULL, 
week_work_begin_date date NOT NULL,
week_work_time_ok real NOT NULL DEFAULT 0,
week_work_time_not_ok real NOT NULL DEFAULT 0,
week_work_time_not_watch real NOT NULL DEFAULT 0,
rate real NOT NULL,
CONSTRAINT PK_week_work PRIMARY KEY(id_week_work),
CONSTRAINT FK_performer_week_work FOREIGN KEY (id_performer)
REFERENCES tb_performer(id_performer)
);
 
CREATE TABLE hours_records.tb_permit
( id_permit varchar(3) NOT NULL AUTO_INCREMENT, 
permit varchar(240) NOT NULL, 
CONSTRAINT PK_permit PRIMARY KEY(id_permit)
);

INSERT INTO hours_records.tb_permit VALUES 
('Оценивание работ'),
('Просмотр работ');


CREATE TABLE hours_records.tb_role
( id_role varchar(2) NOT NULL AUTO_INCREMENT, 
id_permit varchar(3) NOT NULL, 
CONSTRAINT PK_role PRIMARY KEY(id_role),
CONSTRAINT FK_permit_role FOREIGN KEY (id_permit)
REFERENCES tb_permit(id_permit)
);

INSERT INTO hours_records.tb_role VALUES 
('Заказчик'),
('Исполнитель');
#('Администратор');
 
CREATE TABLE hours_records.tb_manage_roles
( id_manage_roles varchar(7) NOT NULL AUTO_INCREMENT, 
id_user varchar(5) NOT NULL, 
id_role varchar(2) NOT NULL, 
CONSTRAINT PK_manage_roles PRIMARY KEY(id_manage_roles),
CONSTRAINT FK_user_manage_roles FOREIGN KEY (id_user)
REFERENCES tb_user(id_user),
CONSTRAINT FK_role_manage_roles FOREIGN KEY (id_role)
REFERENCES tb_role(id_role)
);

INSERT INTO hours_records.tb_manage_roles VALUES 
('1', '1'),
('2', '2'),
('3', '1'),
('3', '2');