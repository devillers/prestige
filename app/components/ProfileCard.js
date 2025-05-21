//app/components/ProfileCard.js

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
    <div className="bg-white rounded-3xl shadow  w-full max-w-[200px] aspect-[3/4] mx-auto flex flex-col items-center justify-start text-center pt-6">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-cover rounded-full mb-3 border-4 border-white shadow-sm"
        />
      )}

      <h2 className="text-md font-semibold leading-tight mb-1 break-words text-center">
        {first_name || title} {last_name}
      </h2>

      <p className="text-sm font-thin text-gray-600 mb-1">{language}</p>

      <p className="text-sm mb-1 font-thin break-words">
        <a href={`tel:${phone}`} className="hover:text-[#bd9254]">
          {phone}
        </a>
      </p>

      {description && (
        <p className="text-sm text-gray-700">{description}</p>
      )}
    </div>
  );
}
