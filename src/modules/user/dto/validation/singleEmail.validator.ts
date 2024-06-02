import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../../../user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class SingleEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(
    value: any,
    // validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const uniqueEmail = await this.userService.findUserByEmail(value);
    return !uniqueEmail;
  }
}

export const IsSingleEmail = (optionsValidation: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: optionsValidation,
      constraints: [],
      validator: SingleEmailValidator,
    });
  };
};
