import { Injectable } from '@nestjs/common';
import {Place} from "./places/place.entity";

@Injectable()
export class AppService {
    async test() {
        const p = new Place();
        await p.save();
        return p;
    }
}
