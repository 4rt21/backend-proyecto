import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ConfigurationsRepository } from './configurations.repositoty';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export default class UpdateConfigutationDto {
  title: string;
  text: string;
}

@Controller('configurations')
export class ConfigurationsController {
  constructor(
    private readonly configurationsRepository: ConfigurationsRepository,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene la configuración por ID' })
  @ApiOkResponse({
    description: 'Configuración obtenida correctamente.',
    example: {
      id: 1,
      title: 'Terminos y condiciones',
      text: '1. Aceptación de los Términos\nAl acceder y utilizar la aplicación Red por la Ciberseguridad, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestra aplicación.\n\n2. Uso de la Aplicación\nEsta aplicación está diseñada para proporcionar información y herramientas relacionadas con la ciberseguridad. El usuario se compromete a:\n• Utilizar la aplicación de manera responsable y ética\n• No intentar comprometer la seguridad de la aplicación\n• Proporcionar información veraz y actualizada\n• Mantener la confidencialidad de sus credenciales de acceso\n\n3. Privacidad y Protección de Datos\nNos comprometemos a proteger su privacidad y datos personales de acuerdo con las leyes aplicables de protección de datos. La información recopilada se utiliza únicamente para los fines establecidos en nuestra política de privacidad.\n\n4. Responsabilidades del Usuario\nEl usuario es responsable de:\n• Mantener la seguridad de su cuenta\n• Utilizar contraseñas seguras\n• Reportar cualquier actividad sospechosa\n• Cumplir con las leyes locales aplicables',
    },
  })
  async getConfiguration(@Param('id') id: string) {
    return this.configurationsRepository.getConfigurationById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza la configuración por ID' })
  @ApiOkResponse({
    description: 'Configuración actualizada correctamente.',
    example: {
      result: 'success',
    },
  })
  async updateConfiguration(
    @Param('id') id: string,
    @Body() body: Partial<UpdateConfigutationDto>,
  ) {
    return this.configurationsRepository.updateConfigurationById(id, body);
  }
}
