import {Bumen} from "../entities/bumen";

export class SqlBumen
{
    static findAll()
    {
        return Bumen.find()
    }
}
