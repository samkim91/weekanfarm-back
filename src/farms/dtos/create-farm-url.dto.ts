import { SnsType } from '../../enums/sns.type';
import {
  IsNotEmpty,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { URL_REGEX } from '../../utils/regex';

export class CreateFarmUrlDto {
  @IsNotEmpty()
  @MaxLength(2100)
  @Matches(URL_REGEX)
  address: string;

  @IsNotEmpty()
  @ValidateNested()
  // @Type(() => SnsType, {
  //   keepDiscriminatorProperty: true,
  //   discriminator: {
  //     property: 'kind',
  //     subTypes: [
  //       { value: SnsType.URL, name: SnsType.URL },
  //       { value: SnsType.FACEBOOK, name: SnsType.FACEBOOK },
  //       { value: SnsType.BLOG, name: SnsType.BLOG },
  //       { value: SnsType.INSTAGRAM, name: SnsType.INSTAGRAM },
  //       { value: SnsType.YOUTUBE, name: SnsType.YOUTUBE },
  //     ],
  //   },
  // })
  type: SnsType;
}
