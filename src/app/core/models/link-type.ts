enum Name {
    E = 'ELEVATOR',
    ESC = 'ESCALATOR',
    S = 'STAIRS',
    OE = 'ENTRANCE'
}

enum SpeedFactor {
    ELEVATOR = 10,
    ESCALATOR = 8,
    STAIRS = 4,
    ENTRACE = 10
}

enum WheelChairAccessibility{
    ELEVATOR = 1,
    ESCALATOR = 0,
    STAIRS = 0,
    ENTRACE = 1
}

export class LinkType{

    private name: Name;
    private speedFactor: number;
    private wheelChairAccessible: boolean;

    constructor(code: string) {
        this.name = Name[code];
        this.setSpeedFactor();
        this.setWheelChairAccessibility();
    }

    isWheelChairAccessible(): boolean {
        return this.wheelChairAccessible;
    }

    getSpeedFactor(): number {
        return this.speedFactor;
    }

    private setSpeedFactor(): void {
        this.speedFactor = SpeedFactor[this.name];
    }

    private setWheelChairAccessibility(): void {
        this.wheelChairAccessible = WheelChairAccessibility[this.name];
    }
}