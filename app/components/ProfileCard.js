export default function ProfileCard({
  title,
  image,
  first_name,
  last_name,
  phone,
  language,
  description,
}) {
  return (
    <div className="bg-white rounded-full shadow p-10  max-w-xs w-full h-full mx-auto flex flex-col items-center text-center">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-40 h-40 object-cover rounded-full mb-1 border-4 border-white shadow-sm"
        />
      )}
      <h2 className="text-md font-semibold mb-1">
        {first_name || title} {last_name}
      </h2>
      <p className="text-sm font-thin text-gray-600 mb-1">{language}</p>
      <p className="text-sm mb-1 font-thin">
        <a href={`tel:${phone}`} className="hover:text-[#bd9254]">
          {phone}
        </a>
      </p>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}
