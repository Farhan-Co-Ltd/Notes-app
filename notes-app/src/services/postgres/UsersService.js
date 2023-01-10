const {nanoid} = require('nanoid')
const {Pool} = require('pg')
const bcrypt = require('bcrypt')
const InvariantError = require('../../exceptions/InvariantError')

class UsersService{
    constructor(){
    this._pool = new Pool()
    }

    async addUser({username, password, fullname}){
    // TODO: Verifikasi username, pastikan belum terdaftar.
    await this._pool.verifyNewUsername(username)

    // TODO: Bila verifikasi lolos, maka masukkan user baru ke database.
    const id = `user-${nanoid(16)}`
    const hashedPassword = await bcrypt.hash(password, 10)
    const query = {
        text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id ",
        values: [id, username, password, fullname]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
        throw new InvariantError('User gagal ditambahkan');
      }

    return result.rows[0].id;
    }

    async verifyNewUsername(username){
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            value: [username]
        }

        const result = await this_pool.query(query)

        if(result.rowCount > 0){
            throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')  
        }
    }
}

module.exports = UsersService