'use client';

import { useState, ChangeEvent } from 'react';
import { useUploadWorkoutVideoMutation } from '../../../redux/features/apiSlice';
import InputField from '../../../components/InputField';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploadWorkoutVideo, { isLoading, error }] = useUploadWorkoutVideoMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    if (!e.target.files) return;
    if (type === 'video') setVideo(e.target.files[0]);
    if (type === 'thumbnail') setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!video || !thumbnail) {
      alert('Both video and thumbnail are required.');
      return;
    }

    const formData = new FormData();
    formData.append('files', video);
    formData.append('files', thumbnail);
    formData.append('title', title);
    formData.append('category', category);

    try {
      const response = await uploadWorkoutVideo(formData).unwrap();
      console.log('Upload Success:', response);
      alert('Workout video uploaded successfully!');
      setTitle('');
      setCategory('');
      setVideo(null);
      setThumbnail(null);
    } catch (err) {
      console.error('Upload Error:', err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-red-600 to-orange-500">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative bg-gray-900 bg-opacity-95 p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-700">
        <h2 className="text-3xl font-bold text-orange-400 text-center mb-4">Upload Workout Video</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <InputField label="Category" type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />

          {/* Video Upload */}
          <div className="relative w-full border-2 border-gray-600 border-dashed rounded-lg p-4 hover:bg-gray-800 transition">
            <label className="flex flex-col items-center cursor-pointer">
              <FaCloudUploadAlt className="text-4xl text-orange-400 mb-2" />
              <span className="text-gray-300 text-sm">Click to upload video</span>
              <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="hidden" />
            </label>
            {video && <p className="mt-2 text-green-400 text-sm text-center">{video.name}</p>}
          </div>

          {/* Thumbnail Upload */}
          <div className="relative w-full border-2 border-gray-600 border-dashed rounded-lg p-4 hover:bg-gray-800 transition">
            <label className="flex flex-col items-center cursor-pointer">
              <FaCloudUploadAlt className="text-4xl text-green-400 mb-2" />
              <span className="text-gray-300 text-sm">Click to upload thumbnail</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} className="hidden" />
            </label>
            {thumbnail && <p className="mt-2 text-blue-400 text-sm text-center">{thumbnail.name}</p>}
          </div>

          {/* Upload Button */}
          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-lg">
            {isLoading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-2">Upload failed. Try again.</p>}
      </div>
    </div>
  );
};

export default UploadVideo;
