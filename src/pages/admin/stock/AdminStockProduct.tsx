import { useState } from "react";
import { CloudUpload, CheckCircle, Trash2 } from "lucide-react";

export default function AdminStock({ type }) {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6">
      <div className="bg-gray-800 shadow-xl rounded-xl p-6 max-w-lg w-full text-white">
        <h2 className="text-2xl font-bold text-center mb-4">Ajouter un {type}</h2>

        {/* Image Upload */}
        <div className="relative w-full flex flex-col items-center border-2 border-dashed border-gray-500 rounded-lg p-4 cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all">
          {image ? (
            <div className="relative w-full flex flex-col items-center">
              <img src={image} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
              <button onClick={() => setImage(null)} className="absolute top-0 right-0 bg-red-500 p-1 rounded-full">
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center cursor-pointer">
              <CloudUpload size={40} className="text-gray-400" />
              <span className="text-sm text-gray-300 mt-2">Glisser-déposer ou cliquer pour ajouter</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* Form */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300">Nom du {type}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 rounded-lg bg-gray-600 text-white focus:ring focus:ring-gray-400"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full p-2 rounded-lg bg-gray-600 text-white focus:ring focus:ring-gray-400"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300">Prix ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full p-2 rounded-lg bg-gray-600 text-white focus:ring focus:ring-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
          <CheckCircle size={20} /> Enregistrer
        </button>
      </div>
    </div>
  );
}
