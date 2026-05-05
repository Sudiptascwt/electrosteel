// dto/section-content.dto.ts
export class CreateSectionContentDto {
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  image_alt?: string;
  order?: number;
}

export class UpdateSectionContentDto {
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  image_alt?: string;
  order?: number;
  is_active ?: boolean;
}

// dto/card-content.dto.ts
export class CreateCardContentDto {
  sectionId: string;
  content: string;
  image_url: string;
  image_alt: string;
  order?: number;
}

// dto/testimonial.dto.ts
export class CreateTestimonialDto {
  name: string;
  designation?: string;
  testimonial: string;
  image_url?: string;
  order?: number;
}

// dto/reward.dto.ts
export class CreateRewardDto {
  category: string;
  title: string;
  description?: string;
  image_url?: string;
  awardedDate?: string;
  order?: number;
}