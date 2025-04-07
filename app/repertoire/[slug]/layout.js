// app/description/layout.js



export const metadata = {
  title: 'Chalet Description',
  description: 'Explore the details of our luxurious chalet.',
};

export default function DescriptionLayout({ children }) {
  return (
    <>
   
      <main >{children}</main>
    </>
  );
}