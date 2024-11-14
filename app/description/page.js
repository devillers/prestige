//app/descrition/page
'use client';
import React, { useState } from 'react';

import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import PhotoGallery from '../components/PhotoGallery';

const page = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <section className="max-w-[1000px] mx-auto text-slate-600  ">
      {/* Header */}
      <div className="font-sans">
        <div className="flex flex-col md:flex-row">
          {/* first part */}
          <div className="mt-4 md:w-1/2 p-6">
            <h1 className="text-3xl font-semibold leading-14">
              Enjoy the peace and tranquility of the mountains at this superb
              chalet surrounded by nature
            </h1>
            <p className="text-gray-600 my-6 text-[12px] flex justify-center items-center gap-2">
              <FaMapMarkerAlt className="text-gray-600" /> France · Megève /
              Evasion Mont Blanc · Saint-Gervais
            </p>
          </div>

          {/* second part - Badges Section */}
          <div className="flex flex-wrap justify-start gap-3 p-6 md:w-1/2">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase text-[12px]">
              <span className="text-white text-[14px]">
                <FaCheck />
              </span>
              Chalet
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase text-[12px]">
              <span className="text-white text-[14px]">
                <FaCheck />
              </span>
              Slopes 900 m, Village 12 km
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase text-[12px]">
              <span className="text-white text-[14px]">
                <FaCheck />
              </span>
              Office for remote working
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase text-[12px]">
              <span className="text-white text-[14px]">
                <FaCheck />
              </span>
              jacuzzi
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase text-[12px]">
              <span className="text-white text-[14px]">
                <FaCheck />
              </span>
              Cinéma
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#eedec6] text-gray-800 rounded-sm uppercase text-[12px]">
              <span className="text-white text-[14px]">
                <FaCheck />
              </span>
              car chargers
            </div>
          </div>
        </div>

        {/* Feature Toggle */}
        <div className="flex px-6">
          <button className="flex items-center gap-2 px-4 py-2 text-[12px] border-[#eedec6] border text-gray-800  rounded-sm uppercase">
            <span className="text-slate-600 text-[12px]">voir</span> +
          </button>
        </div>

        {/* Property Tour Section */}
        <section className="mt-8 p-6">
          {/* <h2 className="text-2xl ">Property tour</h2> */}
          <div className="mt-4">
            <h3 className="text-lg uppercase">CHALET Rémy...</h3>
            <p className="text-gray-700 mt-2 text-[13px] leading-8">
              Immerse yourself in the mountains at this beautiful chalet in the
              secluded hamlet of Bionnassay. Although you'll be just 8km from
              the ski station of Saint-Gervais with its many shops and
              restaurants, the wonderful views of Mont Vorassay and the Refuge
              du Goûter will make you feel as if you're in the middle of
              nowhere.
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'h-auto opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-700 mt-2 text-[13px] leading-8">
                Experienced skiers looking for some stunning night skiing should
                head for the Vallée Blanche - do hire a guide for this 23km run
                which, with a 2,000m drop, will take you from the Aiguille du
                Midi to the Mer de Glace, an almost surreal experience under a
                full moon. It's also possible using touring or hybrid skis to
                ascend from the chalet to the Col de Voza, where you can ski in
                the Les Houches area. For a change from skiing, why not try
                dog-sledding or snow-shoe walking, which are both available
                within a short drive of Chalet La Chandelle. For a little more
                adventure, why not try ice climbing, via ferrata or paragliding?
                In the summer, the mountains become the domain of walkers and
                cyclists. There's so much to see in this varied landscape,
                explore the Bionnassay or Argentière glacier or perhaps the
                Baroque footpath, a 20km trail from Combloux to Les
                Contamines-Montjoie, which takes you past some of the area's
                finest baroque buildings. Look out for marmots along the way!
                Fancy a swim? Head for Lac de Passy where you can relax in the
                pure waters fed by mountain streams, surrounded by wildflowers
                and stunning views of Mont Blanc. Take a picnic and relax while
                the kids enjoy the great play area. There's also a treetop
                adventure course, pedalos and mini-golf, as well as windsurfing,
                paddle boarding and fishing - it's a great family day out. And
                at the end of an exhilarating day, return to soak in the Nordic
                bath at Chalet La Chandelle, enjoy the sunset from the garden,
                get together on the cosy sofas and plan your next mountain
                adventure.
              </p>
            </div>

            {/* Accordion Toggle Button */}
            <button
              onClick={toggleAccordion}
              className="text-yellow-600 font-medium  mt-2 text-[12px]"
            >
              {isExpanded ? 'voir -' : 'voir +'}
            </button>
          </div>
        </section>
        <PhotoGallery />
      </div>
    </section>
  );
};

export default page;
