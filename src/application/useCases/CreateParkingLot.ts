import { ParkingLot } from '@/core/entities';
import { AlreadyExistsError } from '@/core/exceptions';
import { CreateParkingLot, CreateParkingLotCredentials } from '@/core/useCases';
import {
  CreateParkingLotRepository,
} from '@/application/repositories/CreateParkingLot';
import { Encrypter } from '@/infra/adapters';

export class CreateParkingLotUseCase implements CreateParkingLot {
  private readonly createParkingLotRepository: CreateParkingLotRepository;

  constructor(createParkingLotRepository: CreateParkingLotRepository) {
    this.createParkingLotRepository = createParkingLotRepository;
  }

  public async execute(
    { name, password }: CreateParkingLotCredentials,
  ): Promise<ParkingLot> {
    const parkingLotExists = await this.createParkingLotRepository.findByName(
      name,
    );

    if (parkingLotExists) throw new AlreadyExistsError('Parking Lot');

    const parkingLot = this.createParkingLotRepository.create({
      name,
      password: await Encrypter.encrypt(password),
    });

    await this.createParkingLotRepository.save(parkingLot);
    return parkingLot;
  }
}