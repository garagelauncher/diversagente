import { ApiProperty } from '@nestjs/swagger';


export class CreateCategoryDto {
  /**
   * Id é utilizado para ser o identificador uma subcategoria
   * @example 628a97973ce262268e3bfeed
   */
  id: string;

  /**
   * Nome utilizado para a subcategoria
   * @example Alergias
   */
  name: string;

  /**
   * Nome utilizado para a subcategoria
   * @example Alimentacao
   */
  title: string;

  /**
   * Breve descrição do que a subcategoria irá se tratar.
   * @example Alergias
   */
  description?: string;
}
