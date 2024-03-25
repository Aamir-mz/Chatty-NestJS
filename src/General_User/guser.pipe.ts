// nid-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NidValidationPipe implements PipeTransform {
  transform(value: any): any {
    
    if (!isValidNid(value.nid)) {
      throw new BadRequestException('Invalid NID number format');
    }

    
    if (value.nidImage.size > 2 * 1024 * 1024) { // 2 MB limit
      throw new BadRequestException('NID image size should not exceed 2 MB');
    }

    return value;
  }
}


    function isValidNid(nid: string): boolean {
        
        const nidPattern = /^\d{10}$/;
      
       
        return nidPattern.test(nid);
      }
    
      
