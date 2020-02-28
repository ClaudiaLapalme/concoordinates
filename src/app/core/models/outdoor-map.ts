import { POI } from './poi';
import { Map } from './map';

export class OutdoorMap extends Map {

    constructor(outdootPOIs: POI[]) {

        super(outdootPOIs);
    };
}