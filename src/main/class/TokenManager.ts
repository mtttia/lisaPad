import Database from '../database/Database'
import jwt from 'jsonwebtoken'

export default abstract class TokenManager {
    static async createToken(data: unknown): Promise<string> {
        //? it exists for use but this is not an elegant way
        const secret = (await Database.loadSetting())!.jwtSecret
        return jwt.sign(data, secret, { expiresIn: '1h' })
    }

    static async verifyToken(token: string): Promise<unknown> {
        const secret = (await Database.loadSetting())!.jwtSecret
        return jwt.verify(token, secret)
    }
}
