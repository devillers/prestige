//app/LayoutWrapper.js

'use client'


import Header from './components/Header'
import Footer from './components/Footer'


export default function LayoutWrapper({ children, hideLayout = false }) {
    return (
      <>
        {!hideLayout && <Header />}
        <main>{children}</main>
        {!hideLayout && <Footer />}
      </>
    )
  }