// интерфейс Пользователей в таблице
export interface IClient {
	id: string,
	name: string,
	surname: string,
	lastname: string
}

// интерфейс Пользователей в окне Удаления
export interface IClientDelete {
	id: string,
	name: string
}

// интерфейс Юзеров при регистрации
export interface IUser {
	id: string,
	name: string,
	password: string
}
