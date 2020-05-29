

import { Pipe ,PipeTransform } from '@angular/core';

@Pipe({
	  name : 'upper'
})

export class UppercasePipe implements PipeTransform{
	
 transform(value : string) : string{

   if(!value || typeof value !== 'string'){
    
     return '';

   }


    return value.toUpperCase();
 }

}


@Pipe({
	  name : 'firstUpperLetter'
})

export class FirstUpperLetterPipe implements PipeTransform{
	
 transform(value : string) : string{

   if(!value || typeof value !== 'string'){
    
     return '';

   }


    return value.
               split(' ').
               map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
 }

}