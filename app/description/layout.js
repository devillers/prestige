// app/description/layout.js

import PropertyDescriptionHeader from '../components/PropertyDescriptionHeader';

export const metadata = {
  title: 'Chalet Description',
  description: 'Explore the details of our luxurious chalet.',
};

export default function DescriptionLayout({ children }) {
  return (
    <>
      <PropertyDescriptionHeader />
      <main >{children}</main>
    </>
  );
}
