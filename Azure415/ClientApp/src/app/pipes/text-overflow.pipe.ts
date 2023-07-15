import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textOverflow' })
export class TextOverflowPipe implements PipeTransform {

  transform(items: string, length: number): string {
    if (!(items && items.length)) {
      return "";
    }
    if (items.length <= length) {
      return items;
    }
    return (items.slice(0, length)) + '...';
  }

}
