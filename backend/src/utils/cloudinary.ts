import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { config } from '../config/env.js';

// Configure Cloudinary instance
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

/**
 * Upload an image (base64 data URI or remote image URL) to Cloudinary
 */
export async function uploadToCloudinary(
  imageSource: string,
  folder: string = 'ad_catering'
): Promise<CloudinaryUploadResult> {
  // If already hosted on Cloudinary, return as-is
  if (typeof imageSource === 'string' && imageSource.includes('res.cloudinary.com')) {
    return { url: imageSource };
  }

  // Check if credentials are provided
  if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    console.warn('[Cloudinary] Missing credentials. Returning original image source.');
    return { url: imageSource };
  }

  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(imageSource, {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }, // Automatically optimize format and quality
      ],
    });

    console.log(`[Cloudinary] Successfully uploaded image: ${result.secure_url}`);
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('[Cloudinary] Upload failed:', error);
    // Graceful fallback to imageSource so upload doesn't break user flow
    return { url: imageSource };
  }
}

export { cloudinary };
