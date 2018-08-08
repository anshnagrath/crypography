import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
    transform(data, query): any {
        if (!query || !data) { return data; }
        return data.filter(fData =>
            fData.name.toLowerCase().indexOf((query).toLowerCase()) !== -1);
    }

}
