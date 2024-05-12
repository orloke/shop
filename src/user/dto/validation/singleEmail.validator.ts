import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class SingleEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(
    value: any,
    // validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const uniqueEmail = await this.userRepository.getUserByEmail(value);
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
