import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async getOwner(petId: number): Promise<Owner> {
    const pet = await this.petsRepository.findOneOrFail({
      relations: {
        owner: true
      },
      where: {
        id: petId
      }
    });

    return pet.owner;
  }
}
