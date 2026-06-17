import Navbar from "../components/layout/PublicNavbar/Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

/**
 * Structural wrapper layout for public website pages (Home, About, etc.)
 * featuring the top-level sticky public header navbar.
 */
function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;