import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executeWith',
  standalone: true
})
export class ExecuteWithPipe implements PipeTransform {

  transform<T, G>(callback: (...args: any[]) => G, ...args: any[]): G {
    return callback?.(...args);
  }
}
