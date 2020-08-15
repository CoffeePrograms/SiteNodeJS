USE hours_records; 

INSERT INTO hours_records.tb_permit (permit_title) 
VALUES
('Просмотр журнала'), 
('Редактирование журнала'),
('Оценивание журнала'),
('Печать клиентских документов'),
('Печать внутренних оргазационных документов')
;
 
INSERT INTO hours_records.tb_role (role_title)
VALUES 
('Работодатель'), 
('Работник'),
('Админ')
;

INSERT INTO hours_records.tb_manage_permit (id_permit, id_role)
VALUES 
(1, 1), 
(3, 1), 
(4, 1), 
(1, 2), 
(2, 2),
(4, 2),
(5, 3)
;
 
INSERT INTO hours_records.tb_user_info (user_info_login, user_info_email, user_info_password, user_info_fio)
VALUES 
('el', 'frauhermetic@yandex.ua', '1', 'Эльвира Евгеньевна Липова'), 
('employer', 'frauhermetic@yandex.ua','1', 'Виктор Анатольевич Петров'), 
('empl2', 'frauhermetic@yandex.ua', '1', 'Афанасий Викторович Алексеев'),
('w1', 'frauhermetic@yandex.ua', '1', 'Арнольд Григорьевич Мельников'),
('w2', 'frauhermetic@yandex.ua', '1', 'Олег Петрович Речной')
;

INSERT INTO hours_records.tb_user (id_role, id_user_info)
VALUES 
# role, user_info
#admin
(3, 1),
#master
(1, 2), 
(1, 3),
(1, 1),
#worker
(2, 3),
(2, 4),
(2, 5),
(2, 1)
;

INSERT INTO hours_records.tb_type_press (type_press_title)
VALUES 
('Нажатие левой кнопкой мыши'),
('Нажатие правой кнопкой мыши'),
('Нажатие средней кнопкой мыши'),
('Нажатие кнопок на кавиатуре')
;

INSERT INTO hours_records.tb_status_work (status_work_title)
VALUES 
('не оценена'),
('не одобрена'),
('одобрена')
;

# user, task_title, payment_type, rate
INSERT INTO hours_records.tb_task (id_user, task_title, payment_type, rate, task_type, closing_datetime)
VALUES 
(2, 'Анимация движений персонажа', 1, 45, 0, '2018-05-06'),
(2, 'Разработка концепт-артов', 0, 20000, 1, null),
(3, 'Дизайн мультфильма', 0, 8000, 1, null),
(4, 'Интерфейс ', 0, 4000, 1, null)
;
 
# Работники (много работников закреплены за многими задачами)
INSERT INTO hours_records.tb_worker (id_task, id_user)
VALUES 
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(1, 6),
(3, 4),
(4, 4)
;
 
INSERT INTO hours_records.tb_work (id_worker, id_status_work, work_resource_title, work_datetime, work_period, screenshot)
VALUES 
(1, 3, 'firefox.exe', '2018-06-04 00:25:00', 37, null),
(1, 1, '2', '2018-06-04 01:12:05', 8, null),
(1, 1, '2', '2018-06-04 01:20:05', 30, null),
(1, 1, '2', '2018-06-04 01:12:05', 8, null),
(1, 2, '3', '2018-06-04 02:23:09', 7, null),
(1, 2, '3', '2018-06-04 02:30:09', 25, null),
(1, 3, '4', '2018-06-04 04:55:10', 10, null),
(1, 3, '5', '2018-06-04 03:00:00', 10, null),
(1, 3, '4', '2018-06-04 03:15:00', 10, null),
(1, 3, '4', '2018-06-04 03:25:00', 10, null),
(1, 3, '4', '2018-06-04 03:35:00', 10, null),
(1, 3, '4', '2018-06-04 03:45:00', 10, null),
(1, 3, '4', '2018-06-04 03:55:00', 10, null),
(1, 3, '4', '2018-06-04 05:00:00', 240, null),
(1, 3, '4', '2018-06-04 18:55:00', 60, null),
(1, 3, '4', '2018-06-04 20:00:00', 60, null),
(1, 3, '4', '2018-06-04 21:00:00', 60, null),

(1, 3, '4', '2018-06-05 8:10:00', 480, null),
(1, 3, '4', '2018-06-06 8:00:00', 480, null),
(1, 3, '4', '2018-06-07 8:00:00', 480, null),
(1, 3, '4', '2018-06-08 08:00:00', 240, null),
(1, 3, '4', '2018-06-09 8:00:00', 480, null),
(1, 3, '4', '2018-06-10 8:00:00', 480, null),
(1, 3, '4', '2018-06-11 8:00:00', 480, null),


(5, 3, 'firefox.exe', '2018-06-04 00:25:00', 37, null),
(5, 1, '2', '2018-06-04 01:12:05', 8, null),
(5, 1, '2', '2018-06-04 01:20:05', 30, null),
(5, 1, '2', '2018-06-04 01:12:05', 8, null),
(5, 2, '3', '2018-06-04 02:23:09', 7, null),
(5, 2, '3', '2018-06-04 02:30:09', 25, null),
(5, 3, '4', '2018-06-04 04:55:10', 10, null),
(5, 3, '5', '2018-06-04 03:00:00', 10, null),
(5, 3, '4', '2018-06-04 03:15:00', 10, null),
(5, 3, '4', '2018-06-04 03:25:00', 10, null),
(5, 3, '4', '2018-06-04 03:35:00', 10, null),
(5, 3, '4', '2018-06-04 03:45:00', 10, null),
(5, 3, '4', '2018-06-04 03:55:00', 10, null),
(5, 3, '4', '2018-06-04 05:00:00', 240, null),
(5, 3, '4', '2018-06-04 18:55:00', 60, null),
(5, 3, '4', '2018-06-04 20:00:00', 60, null),
(5, 3, '4', '2018-06-04 21:00:00', 60, null),
(5, 3, '4', '2018-06-05 8:10:00', 50, null),
(5, 3, '4', '2018-06-05 9:00:00', 60, null),
(5, 3, '4', '2018-06-05 10:00:00', 60, null),
(5, 3, '4', '2018-06-05 11:00:00', 60, null),
(5, 3, '4', '2018-06-05 15:30:00', 35, null),
(5, 3, '4', '2018-06-05 16:05:00', 55, null),
(5, 3, '4', '2018-06-05 17:00:00', 60, null),
(5, 3, '4', '2018-06-05 18:00:00', 60, null),
(5, 3, '4', '2018-06-06 08:00:00', 240, null),
(5, 3, '4', '2018-06-06 08:00:00', 240, null)
;

INSERT INTO hours_records.tb_press (id_press, id_work, id_type_press, count_press)
VALUES 
(1, 1, 240),
(1, 2, 80),
(1, 3, 63),
(2, 1, 456),
(2, 2, 12),
(2, 3, 7899),
(3, 1, 21),
(3, 2, 148),
(3, 3, 1238),
(4, 1, 12),
(4, 2, 145),
(4, 3, 478),
(5, 1, 22),
(5, 2, 1245),
(5, 3, 124)
;

INSERT INTO hours_records.tb_week_work (id_worker, begin_date, time_ok, time_not_ok, time_not_watch, rate, reward)
VALUES 
(1, '2018-05-21', 30, 2, 0, null, 2000),
(2, '2018-05-21', 27, 2, 5, 3.5, 1000)
;

INSERT INTO hours_records.tb_manual_commission (commission, type_commission, from_date, till_date)
VALUES
(10, 0, 2016, null)
;