create database aulas;
create table if not exists filmes(
	id serial primary key,
	titulo varchar(150) not null,
	genero varchar(100) not null,
	ano int not null,
	imagem_url text
);
create table if not exists usuarios(
	id uuid primary key,
	nome varchar(100) not null,
	email varchar(150) unique not null,
	senha text not null,
	role varchar(20) not null default 'USER',
	criado_em TIMESTAMP default CURRENT_TIMESTAMP
);
