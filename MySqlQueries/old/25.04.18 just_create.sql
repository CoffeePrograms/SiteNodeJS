DROP SCHEMA IF EXISTS hours_records; 
#Создаю БД.
CREATE SCHEMA hours_records; 
#Создаю таблицы.
CREATE TABLE hours_records.tb_type_press
( id_type_press varchar(2) NOT NULL, 
type_press_title varchar(40) NOT NULL, 
CONSTRAINT PK_type_press PRIMARY KEY(id_type_press)
);
 
CREATE TABLE hours_records.tb_status_work
( id_status_work varchar(1) NOT NULL, 
status_work_title varchar(20) NOT NULL, 
CONSTRAINT PK_status_work PRIMARY KEY(id_status_work)
);
 
CREATE TABLE hours_records.tb_user
( id_user varchar(5) NOT NULL, 
user_login varchar(40) NOT NULL, 
user_password varchar(40) NOT NULL, 
user_desc varchar(240) NOT NULL,
CONSTRAINT PK_user PRIMARY KEY(id_user)
);
 
CREATE TABLE hours_records.tb_task
( id_task varchar(4) NOT NULL,
# заказчик
id_user varchar(5) NOT NULL, 
task_title varchar(100) NOT NULL,
# тип: почасовая или фиксированная оплата
payment_type varchar(1) NOT NULL,
# почасовая ставка или фиксированная оплата
rate real NOT NULL,
CONSTRAINT PK_task PRIMARY KEY(id_task),
CONSTRAINT FK_user_task FOREIGN KEY (id_user)
REFERENCES tb_user(id_user)
);
 
# Работники (много работников закреплены за многими задачами)
CREATE TABLE hours_records.tb_worker
( id_worker varchar(5) NOT NULL, 
id_task varchar(4) NOT NULL, 
id_user varchar(5) NOT NULL, 
CONSTRAINT PK_worker PRIMARY KEY(id_worker),
CONSTRAINT FK_task_worker FOREIGN KEY (id_task)
REFERENCES tb_task(id_task),
CONSTRAINT FK_user_worker FOREIGN KEY (id_user)
REFERENCES tb_user(id_user)
);
 
CREATE TABLE hours_records.tb_work
( id_work varchar(7) NOT NULL, 
id_worker varchar(5) NOT NULL, 
id_status_work varchar(1) NOT NULL DEFAULT 0,
work_resource_title varchar(6),
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
( id_press varchar(7) NOT NULL, 
id_work varchar(7) NOT NULL, 
id_type_press varchar(2) NOT NULL, 
count_press varchar(4) NOT NULL, 
CONSTRAINT PK_press PRIMARY KEY(id_press),
CONSTRAINT FK_press_work FOREIGN KEY (id_work)
REFERENCES tb_work(id_work),
CONSTRAINT FK_press_type_press FOREIGN KEY (id_type_press)
REFERENCES tb_type_press(id_type_press)
);
 
CREATE TABLE hours_records.tb_week_work
( id_week_work varchar(7) NOT NULL, 
id_worker varchar(5) NOT NULL, 
week_work_begin_date date NOT NULL,
week_work_time_ok real NOT NULL DEFAULT 0,
week_work_time_not_ok real NOT NULL DEFAULT 0,
week_work_time_not_watch real NOT NULL DEFAULT 0,
rate real NOT NULL,
CONSTRAINT PK_week_work PRIMARY KEY(id_week_work),
CONSTRAINT FK_worker_week_work FOREIGN KEY (id_worker)
REFERENCES tb_worker(id_worker)
);
 
CREATE TABLE hours_records.tb_permit
( id_permit varchar(3) NOT NULL, 
permit varchar(240) NOT NULL, 
CONSTRAINT PK_permit PRIMARY KEY(id_permit)
);
 
CREATE TABLE hours_records.tb_role
( id_role varchar(2) NOT NULL, 
id_permit varchar(3) NOT NULL, 
CONSTRAINT PK_role PRIMARY KEY(id_role),
CONSTRAINT FK_permit_role FOREIGN KEY (id_permit)
REFERENCES tb_permit(id_permit)
);
 
CREATE TABLE hours_records.tb_manage_roles
( id_manage_roles varchar(7) NOT NULL, 
id_user varchar(5) NOT NULL, 
id_role varchar(2) NOT NULL, 
CONSTRAINT PK_manage_roles PRIMARY KEY(id_manage_roles),
CONSTRAINT FK_user_manage_roles FOREIGN KEY (id_user)
REFERENCES tb_user(id_user),
CONSTRAINT FK_role_manage_roles FOREIGN KEY (id_role)
REFERENCES tb_role(id_role)
);
 


#Заполняю таблицы данными.
/*INSERT INTO hours_records.tb_type_press VALUES 
('0','Нажатие правой кнопки мыши'), 
('1','Нажатие левой кнопки мыши'),
('2','Нажатие колесика мыши'),
('3','Нажатие буквенных кнопок на клавиатуре'),
('4','Нажатие цифровых кнопок на клавиатуре'),
('5','Нажатие специальных кнопок на клавиатуре'),
('6','Нажатие стрелок на клавиатуре')

INSERT INTO hours_records.tb_status_work VALUES 
('0','Не оцененная'), 
('1','Одобренная'),
('2','Не одобренная')

INSERT INTO hours_records.tb_user VALUES 
('0', 'daddy', '1', '0'),
('1', 'sunny', '1', '0'),
('2', 'pool', '1', '1')

INSERT INTO hours_records.tb_task VALUES 
('0', '0', 'Игра "Notice me, sempai! I am your yandere-chan, my honey"', '0', '50000.00'),
('1', '0', 'Симулятор свиданий "Dance with me"', '1', '300.00'),
('2', '0', 'Визуальная новелла "Любовь на голубятне"', '1', '100.24'),
('3', '2', 'Умный будильник StandUp!', '1', '54.45'),
('4', '2', 'Point-and-click "Tamaki-sempai, click-click"', '0', '70145.00'),
('5', '0', 'Игра жанра "3 в ряд" "Lolipop"', '1', '150.00')

INSERT INTO hours_records.tb_worker VALUES 
('0', '0', '1'),
('1', '0', '1'),
('2', '1', '2'),
('3', '2', '2')

INSERT INTO hours_records.tb_work VALUES 
# date @date = 'YYYY-MM-DD' 
('0', NULL, '1', '0', '0', '01-02-2016 12:45:20', NULL),
('1', NULL, '1', '0', '0', '01-02-2016 12:55:20', NULL),
('2', NULL, '1', '0', '0', '01-02-2016 13:05:20', NULL),
('3', NULL, '1', '0', '0', '01-02-2016 15:00:54', NULL),
('4', NULL, '1', '0', '0', '01-02-2016 15:10:54', NULL)

INSERT INTO hours_records.tb_press VALUES 
('0','0','0','4572'),
('1','0','1','1245'),
('2','0','2','1231'),
('3','0','3','1896'),
('4','0','4','3456'),
('5','0','5','1245'),
('6','0','6','4725'),
('7','1','0','4572'),
('8','1','1','1245'),
('9','1','2','1231'),
('10','1','3','1896'),
('11','1','4','3456'),
('12','1','5','1245'),
('13','2','0','4572'),
('14','2','1','1245'),
('15','2','2','1231'),
('16','2','4','3456'),
('17','2','5','1245'),
('18','2','6','4725'),
('19','3','0','4572'),
('20','3','1','1245'),
('21','3','2','1231'),
('22','3','3','1896'),
('23','3','4','3456'),
('24','3','5','1245'),
('25','4','0','4572'),
('26','4','1','1245'),
('27','4','2','1231'),
('28','4','3','1896'),
('29','4','4','3456'),
('30','4','5','1245')
*/