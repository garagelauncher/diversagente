import { Logger } from '@nestjs/common';

jest.mock('../src/shared/database/prisma.service.ts');

beforeAll(async () => {
<<<<<<< HEAD
  Logger.log('Inicializando testes');
=======
  Logger.log('Executando suíte de testes');
>>>>>>> refactor/setupTests
});
