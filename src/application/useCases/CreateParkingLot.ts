import { ParkingLot } from '@/core/entities';
import { NameInUseError } from '@/core/exceptions';
import { CreateParkingLot, CreateParkingLotCredentials } from '@/core/useCases';
import {
  CreateParkingLotRepository,
} from '@/application/repositories';
import { Encrypter } from '@/infra/adapters';
import { CreateParkingLotValidator } from '@/application/validators';

export class CreateParkingLotUseCase implements CreateParkingLot {
  private readonly createParkingLotRepository: CreateParkingLotRepository;

  constructor(createParkingLotRepository: CreateParkingLotRepository) {
    this.createParkingLotRepository = createParkingLotRepository;
  }

  public async execute(
    { name, password }: CreateParkingLotCredentials,
  ): Promise<ParkingLot> {
    CreateParkingLotValidator.validate({ name, password });

    const parkingLotExists = await this.createParkingLotRepository.findByName(
      name,
    );

    if (parkingLotExists) throw new NameInUseError();

    const parkingLot = this.createParkingLotRepository.create({
      name,
      password: await Encrypter.encrypt(password),
    });

    await this.createParkingLotRepository.save(parkingLot);
    return parkingLot;
  }
}
