import {Bumen} from "../entities/bumen";
import {getManager} from "typeorm";

export class SqlBumen
{
    static findTrees()
    {
        return getManager().getTreeRepository(Bumen).findTrees()
    }
}
