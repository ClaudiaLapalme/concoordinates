import { Pipe, PipeTransform } from "@angular/core"

enum daysOfWeek {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}

/**
 * Google days of the week are codified. This pipe converts them into
 * strings using the enum at the top of the file.
 */
@Pipe({name: 'convertToDayOfWeek'})
export class ConvertToDayOfWeek implements PipeTransform {

    transform(value: number): string {
        return daysOfWeek[value];
    }
}