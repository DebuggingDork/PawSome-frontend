import Navbar from "../components/Navbar/Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;