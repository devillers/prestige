export default function ProfileCard({ title, image, first_name, last_name, phone, language, description }) {
    return (
      <div className="bg-white rounded-2xl shadow p-4 max-w-sm w-full">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-1">{first_name || title} {last_name}</h2>
        <p className="text-sm text-gray-600 mb-2">{language}</p>
        <p className="text-sm mb-2">📞 {phone}</p>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    );
  }
  