import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/pet.entity';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput);

    return this.ownersRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async getPets(ownerId: number): Promise<Pet[]> {
    const owner = await this.ownersRepository.findOneOrFail({
      relations: {
        pets: true
      },
      where: {
        id: ownerId
      }
    });

    return owner.pets;
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
