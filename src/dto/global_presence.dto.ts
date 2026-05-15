// src/dto/global_presence.dto.ts
import { IsString, IsArray, IsOptional, IsUrl, IsEmail } from 'class-validator';

// src/dto/global_presence.dto.ts
export class globalPresenceDto {
  title?: string;
  direction?: string;
  address?: string[] | string;
  contact?: string[] | string;
  map_link?: string;
  mapLink?: string;  // Alternative naming
  city?: string;
  phone?: string;
  email?: string;
  fax?: string;
  website?: string;
  contact_person?: string;
  contactPerson?: string;  // Alternative naming
  country?: string;
  label?: string;
  description?: string;
  properties?: any;
  image?: string;
  btn_link?: string;
  btnLink?: string;  // Alternative naming
  category?: string;
}