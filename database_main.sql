drop database proyectobd;
create database proyectobd;
use proyectobd;
-- drop schema CONCURSOS;
create table ROLES(
rol_id int primary key,
tipo varchar(25) not null
);
create table CATEGORIAS(
cat_id int primary key,
nombre varchar(25) not null
);
create table USUARIOS(
id int primary key auto_increment,
usuario varchar(25) not null,
contrasena varchar(25) not null,
rol int not null,
foreign key (rol) references ROLES(rol_id) on delete cascade on update cascade
);
create table EVENTOS(
id_evento int primary key auto_increment,
sede varchar(40) not null,
fecha varchar(10) not null,
nombre varchar(25) not null unique
);

create table JURADOS( 
CURP varchar(18) primary key not null,
nombre varchar(25) not null,
apellido1 varchar(25) not null,
apellido2 varchar(25) not null,
contrasena varchar(25) not null
);

create table EQUIPOS(
id_equipo int primary key auto_increment,
nombre varchar(25) unique not null,
institucion varchar(25) not null,
evento varchar(25) not null,
categoria int not null,
foreign key (evento) references EVENTOS(nombre) on delete cascade on update cascade,
foreign key (categoria) references categorias(cat_id) on delete cascade on update cascade
);

create table INTEGRANTES(
CURP varchar(18)primary key,
nombre varchar(40) not null,
apellido1 varchar(25) not null,
apellido2 varchar(25) not null,
edad int not null,
equipo int not null,
foreign key (equipo) references EQUIPOS(id_equipo) on delete cascade  on update cascade
);

create table PROYECTO(
id_proyecto int primary key auto_increment ,
nombre varchar(25) unique not null,
equipo int not null,
foreign key (equipo) references EQUIPOS(id_equipo) on delete cascade on update cascade
);

create table ASIGNADO(
id_asignacion int primary key auto_increment,
jurado varchar(18) not null,
evento int not null,
categoria enum("Primaria", "Secundaria", "Bachillerato", "Profesional"),
foreign key (jurado) references JURADOS(curp) on delete cascade on update cascade,
foreign key (evento) references EVENTOS(id_evento) on delete cascade on update cascade
);

create table EVALUACION(
id_evaluacion int primary key auto_increment,
proyecto int not null,
jurado varchar(18) not null,
evento int not null,
foreign key (proyecto) references PROYECTO(id_proyecto) on delete cascade on update cascade,
foreign key(jurado) references JURADOS(curp) on delete cascade on update cascade,
foreign key(evento) references EVENTOS(id_evento) on delete cascade on update cascade
);

create table CONSTRUCCION(
id int primary key not null auto_increment,
evaluacion int not null,
id_evaluacion int not null,
foreign key (evaluacion) references EVALUACION(id_evaluacion) on delete cascade on update cascade
);

create table PROGRAMACION(
id int primary key not null auto_increment,
evaluacion int not null,
id_evaluacion int not null,
foreign key (evaluacion) references EVALUACION(id_evaluacion) on delete cascade on update cascade
);

create table DISENNO(
id int primary key not null auto_increment,
evaluacion int not null,
id_evaluacion int not null,
foreign key (id_evaluacion) references EVALUACION(id_evaluacion) on delete cascade
);

/*procedimientos de altas*/

-- JURADOS --

delimiter $ 
CREATE PROCEDURE create_jurado(in curp varchar(18), in nom varchar(25), in apell1 varchar(25), in apell2 varchar(25), in contrasena varchar(25))
begin
insert into jurados (curp, nombre, apellido1, apellido2, contrasena) values (curp, nom, apell1, apell2, contrasena);
end $

delimiter $ 
CREATE PROCEDURE update_jurado(in curp varchar(18), in nom varchar(25), in apell1 varchar(25), in apell2 varchar(25))
begin
update jurados set nombre = nom, apellido1 = apell1,  apellido2 = apell2 where CURP = curp;
end $

delimiter $
CREATE PROCEDURE delete_jurado(in curp varchar(18))
begin
delete from jurados where CURP = curp;
end $

delimiter $
CREATE PROCEDURE get_jurados ()
begin
SELECT curp, nombre, apellido1, apellido2, contrasena FROM jurados;
end $

delimiter $
CREATE PROCEDURE get_jurado_by_curp (IN curp_part varchar(18))
begin
SELECT*FROM jurados where CURP=curp_part;
end $


-- EVALUACION --
delimiter $
CREATE PROCEDURE get_evaluaciones()
begin  
SELECT * FROM evaluacion;
end $

DROP PROCEDURE IF NOT EXISTS get_evaluacion_by_id
delimiter $ 
CREATE PROCEDURE get_evaluacion_by_id (IN id int)
begin
SELECT * FROM evaluacion where id_evaluacion = id;
end $

delimiter $ 
CREATE PROCEDURE get_evaluacion_by_proyecto (IN p_id int)
begin
SELECT*FROM evaluacion where proyecto=p_id;
end $

delimiter $ 
CREATE PROCEDURE get_evaluacion_by_jurado (IN j_curp varchar(18))
begin
SELECT*FROM evaluacion where jurado=j_curp;
end $


-- EQUIPOS --

DROP PROCEDURE IF EXISTS get_equipos
delimiter $
CREATE PROCEDURE get_equipos()
begin  
SELECT * FROM equipos;
end $

DROP PROCEDURE IF NOT EXISTS get_equipo_by_id
delimiter $ 
CREATE PROCEDURE get_equipo_by_id (IN id int)
begin
SELECT * FROM equipos where id_equipo = id;
end $

delimiter $
CREATE PROCEDURE get_equipo_by_cat (IN catg int)
begin
SELECT*FROM equipos where categoria=catg;
end $

delimiter $ 
CREATE PROCEDURE get_equipo_by_name (IN nombre_equipo varchar(25))
begin
SELECT*FROM equipos where nombre=nombre_equipo;
end $

delimiter $
CREATE PROCEDURE get_integrantes_by_equipo_count(in eqid int)
begin
select count(*) from integrantes where equipo=eqid;
end $

delimiter $ 
CREATE PROCEDURE update_equipo(in id_eq int, in nom varchar(25), in inst varchar(25), in eve varchar(25), in cat int)
begin
update equipos set nombre = nom, institucion = inst,  evento = eve, categoria = cat where id_equipo = id_eq;
end $

delimiter $
create procedure create_equipo (in nom varchar(25), in inst varchar(25), in eve varchar(25), in cat int) 
begin
insert into EQUIPOS (nombre, institucion, evento, categoria) values (nom, inst, eve, cat);
end $

delimiter $
create procedure delete_equipo (in id int)
begin
delete from integrantes where equipo = id;
delete from EQUIPOS where id_equipo = id;
end
$
-- USUARIOS --
drop procedure if exists get_users;
delimiter $
create procedure get_users()
begin
select * from usuarios;
end $

drop procedure if exists get_user;
delimiter $
create procedure get_user(in id_user int)
begin
select * from usuarios where id = id_user;
end $

delimiter $
create procedure create_user(in usu varchar(25), in pswd varchar(25), in rolid int)
begin
INSERT INTO usuarios (usuario, contrasena, rol) values (usu, pswd, rolid);
end $

delimiter $
create procedure delete_user(in iduser int)
begin
delete from usuarios where id = iduser;
end
$

-- INTEGRANTES --
delimiter $ 
CREATE PROCEDURE create_integrante(in id varchar(18), in nom varchar(25), in apell1 varchar(25), in apell2 varchar(25), in edad int, in equipo int)
begin
insert into integrantes (curp, nombre, apellido1,  apellido2, edad, equipo ) values (id, nom, apell1, apell2, edad, equipo);
end $
delimiter $ 
CREATE PROCEDURE update_integrante(in id int, in nom varchar(25), in apell1 varchar(25), in apell2 varchar(25), in ed int, in equ int)
begin
update integrantes set nombre = nom, apellido1 = apell1,  apellido2 = apell2, edad = ed, equipo = eq where CURP = id;
end $
delimiter $
CREATE PROCEDURE delete_integrante(in id varchar(18))
begin
delete from integrantes where CURP = id;
end $

delimiter $
CREATE PROCEDURE get_integrantes ()
begin
SELECT*FROM integrantes;
end $

delimiter $
CREATE PROCEDURE get_integrante_by_id (IN curp_part varchar(18))
begin
SELECT*FROM integrantes where curp=curp_part;
end $

delimiter $
CREATE PROCEDURE get_integrantes_by_equipo (IN num int)
begin
SELECT*FROM integrantes where equipo=num;
end $



-- Eventos





-- Jurado


delimiter $
create procedure  AltaJurados(in CURP_ju varchar(18), in nombre_ju varchar(25), in apellido1_ju varchar(25), in apellido2_ju varchar(25))
begin 
insert into JURADOS (CURP , nombre , apellido1 , apellido2 ) values (CURP_ju, nombre_ju, apellido1_ju, apellido2_ju);
end $



-- Participante 
delimiter $
create procedure AltaParticipante (in CURP_pt varchar(18), in nm varchar(40), in ap1 varchar(25), in ap2 varchar(25), in age int, in eq int)
begin
insert into PARTICIPANTES(CURP, nombre, apellido1, apellido2, edad, equipo) values (CURP_pt, nm, ap1, ap2, age, eq); 
end $

-- Proyecto 
delimiter $
create procedure AltaProyecto (in nombre varchar(25), in equipo int)
begin
insert into PROYECTOS(nombre, equipo) values (id_proyecto, nombre, equipo); 
end $

/*Crear procedimientos de busqueda*/
/*evento*/
delimiter $
CREATE PROCEDURE get_eventos()
begin
SELECT * FROM eventos;
end $

delimiter $
CREATE PROCEDURE get_evento_by_id(IN id int )
begin
SELECT * FROM eventos WHERE id_evento = id;
end $

delimiter $
CREATE PROCEDURE get_evento_by_name(IN nom varchar(25) )
begin
SELECT * FROM eventos WHERE nombre = nom;
end $


delimiter $
create procedure create_evento (in sede_ev varchar(40), in fecha_ev varchar(10), in nombre_ev varchar(25))
begin 
insert into EVENTOS (sede, fecha, nombre) values ( sede_ev, fecha_ev, nombre_ev);
end $

delimiter $
create procedure update_evento (in id int, in sede_ev varchar(40), in fecha_ev date, in nombre_ev varchar(25))
begin 
update eventos set sede = sede_ev, fecha = fecha_ev, nombre = nombre_ev where id_evento = id;
end $

delimiter $
create procedure delete_evento (in id int)
begin
delete from eventos where id_evento = id;
end $

delimiter $   
CREATE PROCEDURE `buscar_evento_fecha`(IN ev_fecha datetime )
begin
SELECT * FROM eventos WHERE fecha = ev_fecha;
end $
    
delimiter $ 
CREATE PROCEDURE `buscar_evento_nombre` (IN ev_nombre varchar(25) )
begin
SELECT * FROM eventos WHERE nombre = ev_nombre;
end $
    
delimiter $ 
CREATE PROCEDURE `buscar_evento_categoria`(IN categoria_evento enum("Primaria", "Secundaria", "Bachillerato", "Profesional"))
begin
SELECT * FROM eventos natural join asignado where asignado.categoria=categoria_evento;
end $
/*jurado*/
delimiter $ 
CREATE PROCEDURE `buscar_jurado_curp` (IN curp_jurado varchar(18))
begin
SELECT*FROM jurados where CURP=curp_jurado;
end $

delimiter $ 
CREATE PROCEDURE `buscarnombre` (IN nm varchar(25), IN ap1 varchar(25), IN ap2 varchar(25))
begin
SELECT*FROM jurados where nombre=nm and ap1=apellido1 and ap2=apellido2;
end $

delimiter $ 
CREATE PROCEDURE `buscar_jurado_apellido` (IN ap varchar(25))
begin
SELECT*FROM jurados where  ap=apellido1 or ap=apellido2;
end $

delimiter $ 
CREATE PROCEDURE `buscar_jurado_categoria` (IN categoria_jurado enum("Primaria", "Secundaria", "Bachillerato", "Profesional"))
begin
SELECT*FROM jurados natural join asignado where jurado.categoria=categoria_jurado;
end $

/*equipo*/


delimiter $
CREATE PROCEDURE `buscar_equipo_nombre_insti` (IN inst varchar(25))
begin
SELECT*FROM equipos where institucion=inst;
end $



/*integrante*/

delimiter $
CREATE PROCEDURE `buscar_participante_nombre_completo` (IN nm varchar(40), IN ap1 varchar(25), IN ap2 varchar(25))
begin
SELECT*FROM participantes where nombre=nm and apellido1=ap1 and apellido2=ap2;
end $

delimiter $
CREATE PROCEDURE `buscar_participante_nombre` (IN nm varchar(40))
begin
SELECT*FROM participantes where nombre=nm;
end $

delimiter $
CREATE PROCEDURE `buscar_participante_apellido` (IN ap varchar(25))
begin
SELECT*FROM participantes where apellido1=ap or apellido2=ap;
end $

delimiter $
CREATE PROCEDURE `buscar_participante_edad` (IN age int)
begin
SELECT*FROM participantes where edad=age;
end $



delimiter $
CREATE PROCEDURE `buscar_participante_categoria` (IN catg enum("Primaria", "Secundaria", "Bachillerato", "Profesional"))
begin
SELECT*FROM participantes natural join equipo where equipo.categoria=catg;
end $

/*proyecto*/
delimiter $
CREATE PROCEDURE `buscar_proyecto_id` (IN id int)
begin
SELECT*FROM proyecto where id_proyecto=id;
end $

delimiter $
CREATE PROCEDURE `buscar_proyecto_nombre` (IN nm varchar(25))
begin
SELECT*FROM proyecto where nombre=nm;
end $


delimiter $
CREATE PROCEDURE `buscar_proyecto_equipo` (IN eq int)
begin
SELECT*FROM proyecto where equipo=eq;
end $


/*
-- este se repetia
delimiter $
CREATE PROCEDURE `buscar_proyecto_equipo` (IN eq int)
begin
SELECT*FROM proyecto where equipo=eq;
end $
*/

delimiter $
CREATE PROCEDURE `buscar_proyecto_evento` (IN id_ev int)
begin
SELECT*FROM proyecto natural join evaluacion where evento=id_ev;
end $

/*evaluacion*/
delimiter $
CREATE PROCEDURE `buscar_evaluacion_id` (IN id int)
begin
SELECT evaluacion.id_evaluacion as "ID Evaluacion", 
	   evaluacion.proyecto as "ID Proyecto" , 
       evaluacion.jurado as "ID Jurado", 
	   evaluacion.evento as "ID Evento",
	   sum(construccion.insp+construccion.lib)as 'Calificacion Construcción',
       sum(programacion.sisAut+programacion.sisMani+programacion.demost+programacion.inspGen) as "Calificación Programación",
       sum(disenno.medioDigital+disenno.bitacora)as "Calificación Diseño" 
		   FROM evaluacion natural join construccion natural join programacion natural join disenno where id_evaluacion=id;
           end $
/*
CREATE PROCEDURE `buscar_evaluacion_id` (IN curp_jurado varchar(18))
SELECT evaluacion.id_evaluacion as "ID Evaluacion", 
	   evaluacion.proyecto as "ID Proyecto" , 
       evaluacion.jurado as "ID Jurado", 
	   evaluacion.evento as "ID Evento",
	   sum(construccion.insp+construccion.lib)as 'Calificacion Construcción',
       sum(programacion.sisAut+programacion.sisMani+programacion.demost+programacion.inspGen) as "Calificación Programación",
       sum(disenno.medioDigital+disenno.bitacora)as "Calificación Diseño" 
		   FROM evaluacion natural join construccion natural join programacion natural join disenno where jurado=curp_jurado;
           
CREATE PROCEDURE `buscar_evaluacion_id` (IN id_proyecto int)
SELECT evaluacion.id_evaluacion as "ID Evaluacion", 
	   evaluacion.proyecto as "ID Proyecto" , 
       evaluacion.jurado as "ID Jurado", 
	   evaluacion.evento as "ID Evento",
	   sum(construccion.insp+construccion.lib)as 'Calificacion Construcción',
       sum(programacion.sisAut+programacion.sisMani+programacion.demost+programacion.inspGen) as "Calificación Programación",
       sum(disenno.medioDigital+disenno.bitacora)as "Calificación Diseño" 
		   FROM evaluacion natural join construccion natural join programacion natural join disenno where proyecto=id_proyecto;

CREATE PROCEDURE `buscar_evaluacion_id` (IN id_evento int)
SELECT evaluacion.id_evaluacion as "ID Evaluacion", 
	   evaluacion.proyecto as "ID Proyecto" , 
       evaluacion.jurado as "ID Jurado", 
	   evaluacion.evento as "ID Evento",
	   sum(construccion.insp+construccion.lib)as 'Calificacion Construcción',
       sum(programacion.sisAut+programacion.sisMani+programacion.demost+programacion.inspGen) as "Calificación Programación",
       sum(disenno.medioDigital+disenno.bitacora)as "Calificación Diseño" 
		   FROM evaluacion natural join construccion natural join programacion natural join disenno where evento=id_evento;
*/           

insert into roles(rol_id, tipo) values (0, "Jurado"), (1, "Equipo"), (2, "Administrador");
insert into categorias(cat_id, nombre) values (0, "Primaria"), (1, "Secundaria"), (2, "Bachillerato"), (3, "Profesional");

INSERT INTO eventos (sede, fecha, nombre) VALUES ("Sede1", "2022-12-05", "Evento1"), ("Sede2", "2022-12-06", "Evento2");
INSERT INTO equipos (nombre, institucion, evento, categoria) 
VALUES ("Equipo1", "Institucion1", "Evento1", 0), ("Equipo2", "Institucion1", "Evento1", 0),
		("Equipo3", "Institucion2", "Evento2", 1), ("Equipo4", "Institucion2", "Evento2", 2);
        
     
