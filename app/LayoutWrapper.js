//app/LayoutWrapper.js

'use client'


import Header from './components/Header'
import Footer from './components/Footer'
import { useLayout } from './LayoutContext'

export default function LayoutWrapper({ children }) {
    const { hideLayout } = useLayout()
  
    return (
      <>
        {!hideLayout && <Header />}
        <main>{children}</main>
        {!hideLayout && <Footer />}
      </>
    )
  }