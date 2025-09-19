import React from "react";
import styles from "./SideBar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <Footer />
    </div>
  );
}
