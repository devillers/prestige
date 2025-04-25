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
    <div className="bg-white rounded-3xl shadow p-6 w-full aspect-square max-w-[220px] mx-auto flex flex-col items-center justify-center text-center">
      {image && (
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-sm mb-3">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h2 className="text-md font-semibold leading-tight mb-1">
        {first_name || title} {last_name}
      </h2>
      <p className="text-sm font-thin text-gray-600 mb-1">{language}</p>
      <p className="text-sm font-thin mb-1">
        <a href={`tel:${phone}`} className="hover:text-[#bd9254]">
          {phone}
        </a>
      </p>
      {description && <p className="text-sm text-gray-700">{description}</p>}
    </div>
  );
}
