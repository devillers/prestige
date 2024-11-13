//components/ChaletDetails

import React from 'react';

const ChaletDetails = () => {
  return (
    <section className=" container mx-auto max-w-[800px] shadow-sm p-4 mt-[100px]">
      <h1 className="text-5xl md:text-6xl font-bold text-[#eec993] ]">
        LA <span className="text-gray-800">COLLECTION</span>
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-8 mt-[100px]">
        <div className="md:w-2/4 mb-8 md:mb-0 ">
          <img
            src="/images/remy/Dollhouse-View.png
            "
            alt="Chalet Floor Plan"
            className="w-full"
          />
        </div>
        <div className="md:w-2/4 space-y-4 ">
          <h2 className="text-4xl font-bold">Chalet Rémy</h2>
          <div className="flex flex-row">
            <p className="text-xl text-gray-700 font-semibold">
              Saint Gervais les bains
            </p>
            <p className="ml-2 text-gray-600 flex items-center">
              <span className="material-icons text-[#eec993] mr-2">people</span>{' '}
              26
            </p>
          </div>

          <p className="text-gray-700 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
            gravida. Risus commodo viverra maecenas accumsan lacus vel
            facilisis. Lorem ipsum dolor sit
          </p>
          <div className="flex space-x-4 text-gray-600">
            <span className="material-icons">pool</span>
            <span className="material-icons">spa</span>
            <span className="material-icons">local_movies</span>
            <span className="material-icons">wifi</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-8 rounded-sm">
        <img
          src="/images/remy/06_Chalet.Remy_Chambre2.jpg"
          alt="Interior 1"
          className="w-full rounded-sm"
        />
        <img
          src="/images/remy/07_Chalet.Remy_SDB.Chambre2.jpg"
          alt="Interior 2"
          className="w-full rounded-sm"
        />
        <img
          src="/images/remy/08_Chalet.Remy_SDB.Chambre2.jpg"
          alt="Interior "
          className="w-full rounded-sm"
        />
        <img
          src="/images/remy/08_Chalet.Remy_SDB.Chambre2.jpg"
          alt="Interior 3"
          className="w-full rounded-sm"
        />
        <img
          src="/images/remy/011_Chalet.Remy_SDB.Chambre3.jpg"
          alt="Exterior"
          className="w-full rounded-sm"
        />
        <img
          src="/images/remy/010_Chalet.Remy_Chambre3.jpg"
          alt="Interior 4"
          className="w-full rounded-sm"
        />
      </div>
    </section>
  );
};

export default ChaletDetails;
