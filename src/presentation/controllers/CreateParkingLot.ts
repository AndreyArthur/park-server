export class CreateParkingLotController {
  public async handle(httpRequest: any): Promise<any> {
    return Promise.resolve({
      status: 201,
      body: {
        id: '88ca7ea5-4980-4240-b103-69cd5d5a6435',
        name: httpRequest.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
