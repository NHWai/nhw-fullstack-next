import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="max-w-[1028px] min-h-fit px-8 xl:p-0 mx-auto">
        {children}
      </div>
    </>
  );
}

export default Layout;
