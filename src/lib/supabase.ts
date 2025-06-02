import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);
export const getImageUrl = (imagePath: string) => {
  const { data } = supabase.storage
    .from('lapak-syariah')
    .getPublicUrl(`public/brands/${imagePath}`);

  return data.publicUrl;
};

export const uploadImage = async (
  file: File,
  path: 'brands' | 'products' = 'brands'
) => {
  const fileType = file.type.split('/')[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;
  const { error } = await supabase.storage
    .from('lapak-syariah')
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
  return fileName;
};

export const deleteImage = async (
  fileName: string,
  path: 'brands' | 'products' = 'brands'
) => {
  const { error } = await supabase.storage
    .from('lapak-syariah')
    .remove([`public/${path}/${fileName}`]);

  if (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};
